import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "@/lib/gpt";

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5&relevanceLanguage=en`,
  );

  if (!data) {
    console.error("youtube fail");
    return null;
  }

  if (data.items[0] == undefined) {
    console.error("youtube fail");
    return null;
  }

  return data.items;
}

// TODO can be written better
export async function getTranscript(videoId: string) {
  try {
    let transcript = "";

    // TODO: Manage internationalization
    let transcriptArr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });

    for (let t of transcriptArr) {
      transcript += t.text + " ";
    }

    return transcript.replaceAll("\n", "");
  } catch (error) {
    console.log(error);
    return "";
  }
}

type Question = {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
};

export async function getQuestionsFromTranscript(
  transcript: string,
  courseTitle: string,
) {
  const questions: Question[] = await strict_output(
    "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words",
    new Array(5).fill(
      `You are to generate a random hard mcq question about ${courseTitle} with context of the following transcript: ${transcript}`,
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    },
  );
  console.log(questions);
  return questions;
}
