import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

const App = () => {
  const [quote, setQuote] = useState("");
  const [vietnameseQuote, setVietnameseQuote] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [showMore, setShowMore] = useState(false);
  const [titleTextColor, setTitleTextColor] = useState("#FF69B4");
  const [quoteTextColor, setQuoteTextColor] = useState("#000");

  const getRandomQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      if (data && data.content) {
        const mention = `@${data.author}`;
        const quoteWithMention = `${data.content} - ${mention}`;
        setQuote(quoteWithMention);
        const responseTranslation = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
            data.content
          )}`
        );
        const dataTranslation = await responseTranslation.json();
        if (
          dataTranslation &&
          dataTranslation[0] &&
          Array.isArray(dataTranslation[0])
        ) {
          const vietnameseQuote = `Dịch tiếng Việt: ${dataTranslation[0][0][0]}`;
          setVietnameseQuote(vietnameseQuote);
        } else {
          setVietnameseQuote("Dịch tiếng Việt: Lỗi khi dịch");
        }
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };


  const changeBackgroundColor = () => {
    const colors = ["#FFC0CB", "#ADD8E6", "#90EE90", "#FFD700"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  };

  const changeTitleTextColor = () => {
    const colors = ["#FF69B4", "#8A2BE2", "#00BFFF", "#FFA500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTitleTextColor(randomColor);
  };

  const changeQuoteTextColor = () => {
    const colors = ["#000", "#800080", "#008000", "#FF4500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setQuoteTextColor(randomColor);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const handleButtonPress = () => {
    if (!showMore) {
      setShowMore(true);
    } else {
      getRandomQuote();
      changeBackgroundColor();
      changeTitleTextColor();
      changeQuoteTextColor();
    }
  };

  const [fontsLoaded] = useFonts({
    "Bungee-Regular": require("./assets/font/Bungee-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[backgroundColor, "#FFFFFF"]}
    >
      <Text
        style={[
          styles.titleText,
          { color: titleTextColor },
          { fontFamily: "Bungee-Regular" },
          { fontSize: 30 },
        ]}
      >
        {!showMore
          ? "Hello sweetheart :3 \n I got some messages for you"
          : "Here is the message"}
      </Text>
      {showMore && (
        <View style={styles.quoteContainer}>
          <Text
            style={[
              styles.quoteText,
              { color: quoteTextColor },
              {
                fontFamily: "Bungee-Regular",
              },
              { fontSize: 20 },
            ]}
          >
            {quote}
          </Text>
          <Text
            style={[
              styles.vietnameseQuoteText,
              { color: quoteTextColor },
              { fontFamily: "Bungee-Regular" },
              { fontSize: 20 },
            ]}
          >
            {vietnameseQuote}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>
          {!showMore ? "Show more" : "Show another"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    marginHorizontal: 50,
    marginBottom: 50,
  },
  quoteContainer: {
    marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  quoteText: {
    marginVertical: 10,
    textAlign: "center",
  },
  vietnameseQuoteText: {
    marginVertical: 10,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#FF69B4",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Bungee-Regular",
  },
});

export default App;
