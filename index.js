// This file is the entry point for the Expo app
const { registerRootComponent } = require('expo');
const { ExpoRoot } = require('expo-router');
const React = require('react');

// Must be exported or Fast Refresh won't update the context
function App() {
  const ctx = require.context('./app');
  return React.createElement(ExpoRoot, { context: ctx });
}

registerRootComponent(App);
