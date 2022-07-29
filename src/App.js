import React from "react";
import Quiz from "./components/Quiz";
import Ans from "./components/Ans";
import bloby from "./blob/Loadquiz.gif";
import Blobs from "./components/Blobs"
import { nanoid } from "nanoid";


export default function App() {
  const [quis, setquis] = React.useState([]);

  const [truthy, settruthy] = React.useState(false);

  const [correctans, setCorrectAns] = React.useState([]);

  const [disabled, setdisabled] = React.useState(false);

  const [isfetched, setisfetched] = React.useState(false);

  const [correctt, setCorrectt] = React.useState([]);

  const [isLoading, setisLoading] = React.useState(true);
  React.useEffect(() => {
    if (isfetched) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((res) => res.json())

        .then((data) => {
          setisLoading(false);
          setquis(data.results);
        });
    }
  }, [isfetched]);

  const togglefetch = () => {
    setisfetched(true);
  };

  const [quizes, setquizes] = React.useState([]);

  React.useEffect(() => {
    const MainArray = [];
    const correctarray = [];

    quis.map((quiz, index) => {

      const corrects = quiz.correct_answer;

      correctarray.push(corrects);

      setCorrectt(correctarray);

      const incorrect = quiz.incorrect_answers;
      const incorrectans = incorrect.map((answers) => {
        return {
          name: answers,
          key: nanoid(),
          id: nanoid(),
          index: index,
          istrue: false,
        };
      });

      const correctans = {
        name: quiz.correct_answer,
        key: nanoid(),
        id: nanoid(),
        index: index,
        istrue: true,
      };
      incorrectans.push(correctans);
      shuffle(incorrectans);

      const quisAns = {
        question: quiz.question,
        answers: incorrectans,
      };

      return MainArray.push(quisAns);
    });

    setquizes(MainArray);
  }, [quis]);

  const shuffle = (shuffled) => {
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * [i + 1]);

      return ([shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]);
    }
  };

  const ischecked = [0, 0, 0, 0, 0];
  const [checked, isChecked] = React.useState(ischecked);

  const [choice, setChoice] = React.useState(true);
  const collectedItems = [];
  const [collect, setcollect] = React.useState(collectedItems);
  const [count, setcount] = React.useState(0);

  const [message, setmessage] = React.useState(false);

  const [answered, setAnswered] = React.useState(false);

  const fliped = (correctt, collect) => {
    setcount(0);
    setdisabled(true);
    settruthy(true);

    if (collect.includes("")) {
      setmessage(true);
    }

    for (let i = 0; i < correctt.length; i++) {
      if (correctt[i] === collect[i]) {
        setcount((pre) => pre + 1);
      } else if (!collect.includes("")) {
        setAnswered(true);
        setmessage(false);
      }
    }
  };

  const allQuizAns = quizes.map((quis) => {
    const question = quis.question;
    const ques = question
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&rsquo;/g, "")
      .replace(/&oacute;/g, "Ó")
      .replace(/&uacute;/g, "ú")
      .replace(/&eacute;/g, "é");

    const answer = quis.answers.map((answers) => {
      const ans = answers.name
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&rsquo;/g, "")
        .replace(/&oacute;/g, "Ó")
        .replace(/&uacute;/g, "ú")
        .replace(/&eacute;/g, "é");

      return (
        <Quiz
          key={answers.key}
          choices={ans}
          id={answers.id}
          index={answers.index}
          istrue={answers.istrue}
          bts={checked}
          setbts={isChecked}
          choice={checked[answers.index] === answers.id ? true : false}
          collects={collect}
          setcollects={setcollect}
          answer={answered}
          messaged={message}
          iscorrect={answers.istrue}
          ifetch={ifetc}
          disabled={disabled}
        />
      );
    });

    return (
      <div className="div_main">
        <p className="main_container">{ques} </p>
        <div className="container">{answer} </div>
      </div>
    );
  });

  function ifetc() {
    setisfetched(false);

    setChoice(false);
    setAnswered(false);
    settruthy(false);
    setdisabled(false);
    setisLoading(false);
    setisLoading(true);
  }

  const [Loading, setLoading] = React.useState("Loading page");

  return (
    <div
      className="dark"
    >
      <Blobs isfetched = {isfetched} isLoading={isLoading} />

      {isfetched && !isLoading && (
        <div className="Main_app_container">
          {allQuizAns}
          <Ans
            onclick={() => fliped(correctt, collect)}
            ifetch={ifetc}
            Loading={Loading}
            counted={count}
            flip={truthy}
          />

<p id="blue"></p>

        </div>
      )}
      {isLoading && isfetched && (
        <div className="big">
          <img className="resized" src={`${bloby}`} />
          <p className="bigy">Loading</p>
        </div>
      )}

      {!isfetched && (
        <div className="start_page">
          <h1>Quizzy</h1>
          <p>Take 5 Random questions,And Score your best</p>
          <button onClick={togglefetch}>Start</button>
        </div>
        
      )}
    </div>
  );
}
