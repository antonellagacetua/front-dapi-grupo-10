import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const MovieTrailer = ({ videoId, onFullScreenChange }) => {
  const webViewRef = useRef(null);

  const onMessage = (event) => {
    const message = event.nativeEvent.data;
    if (message === 'enterFullscreen') {
      onFullScreenChange(true);
    } else if (message === 'exitFullscreen') {
      onFullScreenChange(false);
    }
  };

  const injectedJavaScript = `
    (function() {
      function notifyFullScreenChange() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
          window.ReactNativeWebView.postMessage('enterFullscreen');
        } else {
          window.ReactNativeWebView.postMessage('exitFullscreen');
        }
      }

      document.addEventListener('fullscreenchange', notifyFullScreenChange);
      document.addEventListener('webkitfullscreenchange', notifyFullScreenChange);
      document.addEventListener('mozfullscreenchange', notifyFullScreenChange);
      document.addEventListener('msfullscreenchange', notifyFullScreenChange);

      var player = document.querySelector('iframe');
      if (player) {
        player.addEventListener('onStateChange', function(event) {
          if (event.data == 1) { // Playing
            window.ReactNativeWebView.postMessage('enterFullscreen');
          } else {
            window.ReactNativeWebView.postMessage('exitFullscreen');
          }
        });
      }
    })();
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trailer</Text>
      {videoId ? (
        <WebView
          ref={webViewRef}
          style={styles.video}
          javaScriptEnabled={true}
          injectedJavaScript={injectedJavaScript}
          onMessage={onMessage}
          source={{ uri: `https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0&rel=0&autoplay=0&controls=1&fs=1` }}
          allowsFullscreenVideo={true}
        />
      ) : (
        <Text>No video ID provided</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 9 / 16, // Maintain 16:9 aspect ratio
  },
});

export default MovieTrailer;
