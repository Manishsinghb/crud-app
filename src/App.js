import './App.css';
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2 } from 'react-feather';
import { Modal } from 'react-responsive-modal';
import Search from './components/Search';
import Sort from './components/Sort';

function App() {

  const blankuser = {
    "name": "",
    "email": "",
    "address": ""
  }

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Add');
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add');
  }

  const addUser = () => {
    setUserdata([...userdata, user]);
    setUser(blankuser);
    onCloseModal();
  }

  const editUser = (index) => {
    setAction('Edit');
    const selectedUser = userdata.find((x, i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  }

  const updateUser = () => {
    const newUsers = userdata.map((x, i) => {
      if (i === editIndex) {
        return user;
      }
      return x;
    });
    setUserdata(newUsers);
    setUser(blankuser);
    setEditIndex(null);
    onCloseModal();
  }

  const deleteUser = (index) => {
    const newUsers = userdata.filter((x, i) => i !== index);
    setUserdata(newUsers);
  }

  const sortUsers = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...userdata].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setUserdata(sortedData);
  }

  // Filter the user data by the search term (email)
  const filteredUsers = userdata.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className='btn btn-p' onClick={onOpenModal}>
          <PlusCircle size={16}></PlusCircle>
          <span>Add</span>
        </button>

        {/* Search Component */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            {/* Sort components for sorting each column */}
            <Sort sortConfig={sortConfig} sortUsers={sortUsers} field="name" />
            <Sort sortConfig={sortConfig} sortUsers={sortUsers} field="email" />
            <Sort sortConfig={sortConfig} sortUsers={sortUsers} field="address" />
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 && filteredUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <button className='btn ml2' onClick={() => editUser(index)}>
                    <Edit size={16}></Edit>
                    <span>Edit</span>
                  </button>
                  <button className='btn ml2' onClick={() => deleteUser(index)}>
                    <Trash2 size={16}></Trash2>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        <div className='form'>
          <label htmlFor="">Name</label>
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, "name": e.target.value })} />
          <label htmlFor="">Email</label>
          <input type="text" value={user.email} onChange={(e) => setUser({ ...user, "email": e.target.value })} />
          <label htmlFor="">Address</label>
          <textarea value={user.address} cols="30" rows="5" onChange={(e) => setUser({ ...user, "address": e.target.value })}></textarea>
          {action === 'Add' && <button className='btn' onClick={() => addUser()}>Submit</button>}
          {action === 'Edit' && <button className='btn' onClick={() => updateUser()}>Update</button>}
        </div>
      </Modal>
    </div>
  );
}

export default App;
