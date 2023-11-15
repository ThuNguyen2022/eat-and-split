import { useState } from "react";
import "./App.css";

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(friends);
  function toggleShowAddFriend() {
    setShowAddFriend((showAddFriend) => (!showAddFriend));
  }

  function handleAddNewFriend(newfriend) {
    setFriendList((friendList) => [...friendList, newfriend]);
    toggleShowAddFriend()
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friendList} />
        {showAddFriend && <NewFriendForm onAddFriend={handleAddNewFriend} />}
        <Button
          children={showAddFriend ? "Close" : "Add Friend"}
          onClick={toggleShowAddFriend}
        />
      </div>
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  const { name, balance, avatarUrl } = friend;
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
    </li>
  );
}

function NewFriendForm({onAddFriend}) {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    const newFriend = {
      name: name,
      imageUrl: imageUrl,
      id: crypto.randomUUID()
    }
    onAddFriend(newFriend)
    setName('')
    setImageUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input type="text" onChange={(e) => setName(e.target.value)}/>

      <label>Image Url</label>
      <input type="text" onChange={(e) => setImageUrl(e.target.value)}/>

      <button type="submit">Add</button>
    </form>
  );
}

function SplitForm(props) {
  return (
    <div>
      <h1>Split a bill with</h1>
      <form>
        <label>Bill value</label>
        <input type="text" />

        <label>Your expense</label>
        <input type="text" />

        <label>Clark's expense</label>
        <input type="text" />

        <label>Who is paying the bill</label>
        <select></select>
      </form>
    </div>
  )
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
