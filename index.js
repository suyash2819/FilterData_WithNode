const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter a word you want to know occurrence of \n", (word) => {
  fs.readFile("data.txt", "utf8", (err, data) => {
    console.log(`${word} has occurred `, data.split(word).length - 1, " times");
    var sentences = data.trim().split(/[?.:]+/g);

    console.log("sentences in which it occurs are: \n");
    pickSentences(sentences, word);

    console.log("Conversations is which it occurs are: \n");
    pickConversations(data, word);

    console.log("Proper Nouns in Excerpt are: \n");
    pickProperNouns(data);
  });
  readline.close();
});

const pickSentences = (s, word) => {
  var count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i].indexOf(word) != -1) {
      count++;
      console.log(count, " ", s[i], "\n");
    }
  }
};

const pickConversations = (data, word) => {
  var count = 0;
  var conversations = data.match(/"([^"]+)"/g);
  for (let i = 0; i < conversations.length; i++) {
    if (conversations[i].indexOf(word) != -1) {
      count++;
      console.log(count, " ", conversations[i], "\n");
    }
  }
  console.log("All Conversations in the excerpt are: \n");
  for (let i = 0; i < conversations.length; i++) {
    count++;
    console.log(count, " ", conversations[i], "\n");
  }
};

const pickProperNouns = (data) => {
  var k = data.match(/(([A-Z]([a-z]+|\.+))+(\s[A-Z][a-z]+)+)|([A-Z]{2,})/g);
  for (let i = 0; i < k.length; i++) {
    console.log(k[i], "\n");
  }
};
