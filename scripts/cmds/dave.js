module.exports = {
	config: {
		name: "Dave",
		aliases: ["blackbox"],
		version: "1.0",
		author: "Dfw Dave ɭɭ",
		countDown: 5,
		role: 0,
		shortDescription: "ai",
		longDescription: "black box",
		category: "Ai",
		guide:  {
			vi: "{pn} text ",
		    en: "{pn} text"
		}
	},



  onStart: async function ({ api, event, args }) {
    const axios = require("axios");
    const { messageID, threadID, senderID, body } = event;
    const tid = threadID;
    const mid = messageID;
    const q = encodeURIComponent(args.join(" "));

    if (!q) {
      return api.sendMessage("[🖤] - 🏌️Tell me what you wanna  ", tid, mid);
    }

    try {
      api.setMessageReaction("🖤", mid, (err) => {}, true);
      api.sendMessage("Π🏌️🤏🏼 Dave is searching  fixed dev", tid, mid);

      const url = "https://useblackbox.io/chat-request-v4";

      const data = {
        textInput: q,
        allMessages: [{ user: q }],
        stream: "",
        clickedContinue: false,
      };

      const response = await axios.post(url, data);

      const answer = response.data.response[0][0];

      api.sendMessage(answer, tid, mid);
    } catch (error) {
      api.sendMessage(error.message, tid, mid);
    }
  },
};