import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiUserFollowLine } from "react-icons/ri";
import { AiTwotoneDelete, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

function App() {
  // const data =
  const [bodyInpVal, setBodyInpVal] = useState("");
  const [titleInpVal, setTitleInpVal] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const date = new Date(Date.now());
  const [userName, setUserName] = useState("Sign In");
  const [showUserNameForm, setShowUserNameForm] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      title: "Todo Card",
      body: ["Item One", "Item Two"],
    },
    {
      id: 2,
      title: "Example Card",
      body: ["Item One", "Item Two"],
    },
  ]);

  useEffect(() => {
    !localStorage.getItem("DATA")
      ? localStorage.setItem("DATA", JSON.stringify(data))
      : setData(JSON.parse(localStorage.getItem("DATA")));

    !localStorage.getItem("USER NAME")
      ? setShowUserNameForm(true)
      : setUserName(localStorage.getItem("USER NAME"));
  }, []);

  const removeCard = (cardIndex) => {
    const filtered = data.filter((card) => card.id !== data[cardIndex].id);
    console.log(filtered);
    setData(filtered);

    localStorage.setItem("DATA", JSON.stringify(filtered));
  };

  const removeBody = (card, ix) => {
    setData([...data], {
      id: card.id,
      title: card.title,
      body: card.body.splice(ix, 1),
    });

    localStorage.setItem("DATA", JSON.stringify(data));
  };

  const addBody = (card) => {
    if (bodyInpVal !== "") {
      setData([...data], {
        id: card.id,
        title: titleInpVal,
        body: card.body.push(bodyInpVal),
      });
      localStorage.setItem("DATA", JSON.stringify(data));
    } else {
      alert("Can not create empty body");
    }
  };

  const addCard = () => {
    if (titleInpVal === "") {
      const addingCard = [
        ...data,
        {
          id: data.length + 1,
          title: `${date.toDateString()}`,
          body: [],
        },
      ];
      setData(addingCard);
      console.log(addingCard);
      setShowAddCard(false);

      localStorage.setItem("DATA", JSON.stringify(addingCard));
    } else {
      setData([
        ...data,
        {
          id: data.length + 1,
          title: titleInpVal,
          body: [],
        },
      ]);
      setShowAddCard(false);

      localStorage.setItem("DATA", JSON.stringify(data));
    }
  };

  return (
    <div className="App">
      <div className="nav">
        <span onClick={() => setShowUserNameForm(true)}>
          {" "}
          {RiUserFollowLine()}
          {userName}
        </span>
      </div>

      {showUserNameForm && (
        <div className="signInForm">
          <h2>Profile Name</h2>
          <p>
            You Can Leave It Empty or Change it any time by clicking on Sign
            in/Your Name on top right corner
          </p>
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Your Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={() => {
              if (userName === "") {
                localStorage.setItem("USER NAME", "Sign In");
                setShowUserNameForm(!showUserNameForm);
                setUserName("Sign In");
              } else {
                localStorage.setItem("USER NAME", userName);
                setShowUserNameForm(!showUserNameForm);
              }
            }}
          >
            Assign New User Name
          </button>
        </div>
      )}

      <div className="app">
        <div className="body">
          {showAddCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="add-card-form"
            >
              <p
                className="closeAddForm"
                onClick={() => setShowAddCard(!showAddCard)}
              >
                x
              </p>
              <p>
                In case the Card Title left empty a new Card will be created
                with today's Date which is <br />{" "}
                <strong>"{date.toDateString()}"</strong>
              </p>
              <input
                type="text"
                placeholder="Enter New Card's Title..."
                value={titleInpVal}
                onChange={(e) => setTitleInpVal(e.target.value)}
              />

              <button onClick={() => addCard()}>Add Card</button>
            </motion.div>
          )}
          <button
            className="createCard"
            onClick={() => setShowAddCard(!showAddCard)}
          >
            Create a New Card +
          </button>
          <div className="cardsList">
            {data &&
              data.map((card, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index / 10 }}
                  className="card"
                  key={index}
                >
                  <p className="deleteCard" onClick={() => removeCard(index)}>
                    {AiTwotoneDelete()}
                    Delete Card
                  </p>
                  <h3 className="cardTitle">{card.title}</h3>

                  <motion.ul layout>
                    {card.body &&
                      card.body.map((body, ix) => (
                        <li key={ix}>
                          <div>{body} </div>
                          <button onClick={() => removeBody(card, ix)}>
                            {RiDeleteBin5Line()}
                          </button>
                        </li>
                      ))}
                    <input
                      type="text"
                      className="bodyInput"
                      // value={bodyInpVal}
                      onChange={(e) => setBodyInpVal(e.target.value)}
                      placeholder=" Enter New Item..."
                    />
                    <button
                      className="addNewItem"
                      onClick={() => addBody(card)}
                    >
                      Add an Item{" "}
                      <span className="icon">{AiOutlinePlus()}</span>
                    </button>
                    <br />
                    <br />
                  </motion.ul>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
