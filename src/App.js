import { useState } from "react";
import "./App.css";

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(friends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function toggleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddNewFriend(newfriend) {
    setFriendList((friendList) => [...friendList, newfriend]);
    toggleShowAddFriend();
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(friend.id === selectedFriend?.id ? null : friend);
  }

  function handleSplitBill(bill, yourExpense, whoIsPaying) {
    const friendIndex = friendList.findIndex((friend) => friend.id === selectedFriend.id);
    const friendExpense = whoIsPaying === 'you' ? bill - yourExpense : yourExpense - bill
    const newFriendList = [...friendList];
    newFriendList[friendIndex].balance += friendExpense;
    setFriendList(newFriendList);
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar friend-list">
        <FriendList
          friends={friendList}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <NewFriendForm onAddFriend={handleAddNewFriend} />}
        <Button
          children={showAddFriend ? "Close" : "Add Friend"}
          onClick={toggleShowAddFriend}
        />
      </div>
      {selectedFriend && (
        <SplitForm
          onSplitBill={handleSplitBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const { name, balance, avatarUrl } = friend;
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className="friend">
      <img src={avatarUrl} alt="avatar" />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}€
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owe you {Math.abs(balance)}€
        </p>
      )}
      {balance === 0 && <p className="black">You and {name} are even</p>}
      <Button
        children={isSelected ? "Close" : "Select"}
        onClick={() => onSelectFriend(friend)}
      />
    </li>
  );
}

function NewFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const newFriend = {
      name: name,
      imageUrl: imageUrl,
      id: crypto.randomUUID(),
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImageUrl("");
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <div>
        <label>🤡 Friend name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>🏀 Image Url</label>
        <input type="text" onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

function SplitForm({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [friendExpense, setFriendExpense] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("you");

  function onYourExpenseChange(value) {
    setYourExpense(value);
    setFriendExpense(bill - value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSplitBill(bill, yourExpense, whoIsPaying);
  }

  console.log("friend expense", friendExpense);
  return (
    <div className="split-form">
      <form onSubmit={handleSubmit}>
        <h1>Split a bill with {selectedFriend.name}</h1>
        <div>
          <label>🦆 Bill value</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </div>

        <div>
          <label>🦁 Your expense</label>
          <input
            type="number"
            value={yourExpense}
            onChange={(e) => onYourExpenseChange(e.target.value)}
          />
        </div>

        <div>
          <label>🦄 {selectedFriend.name} expense</label>
          <input type="text" value={friendExpense} onChange={() => {}} />
        </div>

        <div>
          <label>🦋 Who is paying the bill</label>
          <select
            onChange={(e) => setWhoIsPaying(e.target.value)}
            value={whoIsPaying}
          >
            <option value="you" key="you">
              You
            </option>
            <option value={selectedFriend.id} key={selectedFriend.id}>
              {selectedFriend.name}
            </option>
          </select>
        </div>
        <Button
          children={"Split bill"}
        />
      </form>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

const friends = [
  {
    name: "Sarah",
    balance: 10,
    avatarUrl: "https://avatars3.githubusercontent.com/u/9384699?s=400&v=4",
    id: "78f1eb21-5b2a-416f-9f71-4d9c41c17d9d",
  },
  {
    name: "Jonas",
    balance: -15,
    avatarUrl: "https://avatars3.githubusercontent.com/u/9384699?s=400&v=4",
    id: "78f1eb21-5b2a-416f-9f71-4d9c41c17d9f",
  },
];

export default App;
