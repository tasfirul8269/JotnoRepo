import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Timer } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';

export default function OTPScreen() {
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    // Move to next input if current input is filled
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft === 0) {
      setTimeLeft(60);
      setError('');
      setIsLoading(true);
      try {
        // TODO: Implement resend OTP logic
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Resend OTP error:', error);
        setError('Failed to resend OTP. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.some(digit => !digit)) return;

    setError('');
    setIsLoading(true);
    try {
      const otpString = otp.join('');
      await verifyOtp(otpString);
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit code to your phone number
        </Text>
      </View>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              error ? [styles.otpInput, styles.otpInputError] : styles.otpInput,
            ]}
            value={digit}
            onChangeText={text => handleOtpChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Timer and Resend */}
      <View style={styles.timerContainer}>
        <Timer size={20} />
        <Text style={styles.timerText}>
          {timeLeft > 0 ? `Resend code in ${timeLeft}s` : 'Didn\'t receive the code?'}
        </Text>
        {timeLeft === 0 && (
          <TouchableOpacity 
            onPress={handleResendOtp}
            disabled={isLoading}
          >
            <Text style={[
              styles.resendText,
              isLoading && styles.resendTextDisabled
            ]}>
              Resend
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Verify Button */}
      <TouchableOpacity 
        style={[
          styles.verifyButton,
          (otp.some(digit => !digit) || isLoading) && styles.verifyButtonDisabled
        ]}
        onPress={handleVerifyOtp}
        disabled={otp.some(digit => !digit) || isLoading}
      >
        <Text style={styles.verifyButtonText}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.textPrimary,
  },
  otpInputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  timerText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  resendText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 4,
  },
  resendTextDisabled: {
    opacity: 0.7,
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  verifyButtonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    color: Colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});