// apiCall.js
const apiCall = () => {
      // for the call to the api 
  // const difficultyArr = ["easy", "medium", "hard"];
  // const [categoryArray, setCategoryArr] = useState([]);
  
  // user selection - for second api call
  // const [userChoiceSetting, setUserChoiceSetting] = useState({
  //   userCategory: '',
  //   userDifficulty: '',
  // })  
  
  // error messages
  // const [selectionError, setSelectionError] = useState(false);
  // const [avatarError, setAvatarError] = useState(false);
  // const [networkErrorMsg, setNetworkErrorMsg] = useState(false);

  // ternary for link to quiz

  // const handleCategoryChoice = (event) => {
  //   setUserChoiceObject((prevState) => {
  //     return {...prevState, userCategory: event.target.value}
  //   })
  // };

  // const handleDifficultyChoice = (event) => {
  //   setUserChoiceObject((prevState) => {
  //     return {...prevState, userDifficulty: event.target.value}
  //   })
  // };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   if (avatarImage === '') {
  //     setAvatarError(true)
  //   } 
  //   if (userChoiceObject.userCategory && userChoiceObject.userDifficulty) {
  //     secondAPICall();
  //     setSelectionError(false);
  //   } else {
  //     setSelectionError(true);
  //   }
  // };
  
  // const handleUserName = (event) => {
  //   setUserName(event.target.value)
  // }

  // const handleAvatarSubmit = (event) => {
  //   event.preventDefault()
  //   setAvatarImage(userName)
  //   setAvatarError(false)
  // };

  // const allPlayerArrUpdate = () => {
  //   let tempAllPlayersArr = [...allPlayersArr];
  //   tempAllPlayersArr[0] = {
  //     ...tempAllPlayersArr[0],
  //     playerName: userName,
  //     avatar: `https://robohash.org/${userName}.png`
  //   }
  //   setAllPlayersArr(tempAllPlayersArr);
  // }
  
      // const shuffleArr = (array) => {
  //   let currentIndex = array.length, randomIndex;
  //   // While there remain elements to shuffle...
  //   while (currentIndex !== 0) {
  //   // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;
  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  //   }
  //   return array;
  // }

  // useEffect(() => {
  //   axios({
  //     url: "https://opentdb.com/api_category.php",
  //     method: "GET",
  //     responseType: "json",
  //     params: {},
  //   }).then((res) => {
  //     if (res.statusText === "OK" || res.status === 200) {
  //       return res;
  //     } else {
  //       throw new Error();
  //     }
  //   }).then((res) => {
  //       setCategoryArr(res.data.trivia_categories);
  //     }).catch((err) => {
  //       if (err.message === "Network Error") {
  //         setNetworkErrorMsg(true); 
  //       }
  //     });
  // }, []);

  // const secondAPICall = () => {
  //   if (userChoiceObject.userCategory !== "" && avatarImage !== '') {
  //     axios({
  //       url: "https://opentdb.com/api.php",
  //       method: "GET",
  //       responseType: "json",
  //       params: {
  //         amount: 10,
  //         category: userChoiceObject.userCategory,
  //         type: "multiple",
  //         difficulty: userChoiceObject.userDifficulty,
  //       },
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         return res;
  //       } else {
  //         throw new Error();
  //       }
  //     }).then((res) => {
  //         const returnedObject = res.data.results;

  //         if (returnedObject.length) {
  //           const combinedAnswerArr = [...returnedObject];
  //           combinedAnswerArr.forEach((quizObject) => {
  //             const quizAnswers = [quizObject.correct_answer, ...quizObject.incorrect_answers];
  //             const updatedQuizAnswers = quizAnswers.map((quiz) => {
  //               if (quiz === quizObject.correct_answer) {
  //                 return {
  //                   name: quiz,
  //                   isCorrect: true,
  //                 }
  //               } else {
  //                 return {
  //                   name: quiz,
  //                   isCorrect: false,
  //                 }
  //               }
  //             })
  //             quizObject.answerButtons = shuffleArr(updatedQuizAnswers);
  //           })
  //           setQuizQuestions(true);
  //           props.collectQuizQuestions(combinedAnswerArr, allPlayersArr);
  //         } else {
  //           setQuizQuestions(false);         
  //           setSelectionError(true);           
  //         }
  //         return res;
  //       }).catch((err) => {
  //         if (err.message === "Network Error") {
  //           setNetworkErrorMsg(true); 
  //         }
  //       });
  //   }
  // }
}

export default apiCall;