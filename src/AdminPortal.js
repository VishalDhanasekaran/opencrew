import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

import './AdminPortal.css';

const AdminPortal = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(true);

  const navigate = useNavigate();
  
  // Form state
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');



  const handleAdminLogin = async (e) => {
    e.preventDefault();
  
    console.log('Sending Admin Name:', adminName);
    console.log('Sending Admin Password:', adminPassword);
  
    try {
      const response = await fetch('http://localhost:5000/admin-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminName, adminPassword }),
      });
  
      if (response.ok) {
        setShowAdminLogin(false);
      } else {
        const errorData = await response.json();
        console.log('Error Response:', errorData);
        setError('Invalid admin credentials');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to verify admin credentials');
    }
  };


  // Fetch all candidates when component mounts
  useEffect(() => {
    if (!showAdminLogin) {
      fetchCandidates();
    }
  }, [showAdminLogin]);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/home');
        return;
      }
  
      fetch('/admin-portal', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }, [navigate]);
    

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const candidatesCollection = collection(db, 'candidates');
      const snapshot = await getDocs(candidatesCollection);
      const candidatesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort candidates by order field
      candidatesList.sort((a, b) => a.order - b.order);
      setCandidates(candidatesList);
      setError(null);
    } catch (err) {
      setError('Failed to fetch candidates: ' + err.message);
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setRole('');
    setDepartment('');
    setYearOfStudy('');
    setPhoto(null);
    setPhotoURL('');
    setCurrentId('');
    setEditMode(false);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      
      // Create a preview URL for the image
      setPhotoURL(URL.createObjectURL(file));
      
      // Convert image to base64 for storage
      convertToBase64(file)
        .then(base64 => {
          setPhoto(base64);
        })
        .catch(err => {
          console.error("Error converting image to base64:", err);
          setError("Error processing image. Please try a different image.");
        });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Validate that we have an image
      if (!photo && !editMode) {
        throw new Error("Please select an image");
      }
      
      const candidateData = {
        name,
        role,
        department,
        yearOfStudy,
        photo: photo || photoURL, // Use existing photo if no new one is selected
        order: candidates.length // Set order to the next available index
      };
      
      if (editMode) {
        // Update existing candidate
        const candidateRef = doc(db, 'candidates', currentId);
        await updateDoc(candidateRef, candidateData);
        console.log(`Candidate "${name}" successfully updated!`);
      } else {
        // Add new candidate
        const docRef = await addDoc(collection(db, 'candidates'), candidateData);
        console.log(`Candidate "${name}" successfully added with ID: ${docRef.id}`);
      }
      
      // Refresh the candidates list
      fetchCandidates();
      resetForm();
      
    } catch (err) {
      setError(`Failed to ${editMode ? 'update' : 'add'} candidate: ${err.message}`);
      console.error(`Error ${editMode ? 'updating' : 'adding'} candidate:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (candidate) => {
    setEditMode(true);
    setCurrentId(candidate.id);
    setName(candidate.name);
    setRole(candidate.role);
    setDepartment(candidate.department);
    setYearOfStudy(candidate.yearOfStudy);
    setPhotoURL(candidate.photo);
    setPhoto(candidate.photo);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'candidates', id));
        console.log(`Candidate with ID: ${id} successfully deleted!`);
        fetchCandidates();
      } catch (err) {
        setError('Failed to delete candidate: ' + err.message);
        console.error('Error deleting candidate:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const moveCandidate = async (index, direction) => {
    const newCandidates = [...candidates];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCandidates.length) return;

    // Swap candidates
    [newCandidates[index], newCandidates[targetIndex]] = [newCandidates[targetIndex], newCandidates[index]];

    // Update state
    setCandidates(newCandidates);

    try {
      setLoading(true);
      await Promise.all(newCandidates.map((candidate, i) => {
        const candidateRef = doc(db, 'candidates', candidate.id);
        return updateDoc(candidateRef, { order: i });
      }));
      console.log('Candidates order updated successfully!');
    } catch (err) {
      setError('Failed to update candidates order: ' + err.message);
      console.error('Error updating candidates order:', err);
    } finally {
      setLoading(false);
    }
  };




  
  if (showAdminLogin) {
    return (
      <div className="admin-login-modal">
        <div className="admin-login-content">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label>Admin Name:</label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Admin Password:</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-container">
      <h1 className="admin-portal-title">Admin Portal</h1>
      <h1 className="admin-portal-title">Upload the Selected Candidates:</h1>
      
      {error && (
        <div className="admin-portal-error">
          {error}
        </div>
      )}
      
      <div className="admin-portal-card">
        <h2 className="admin-portal-card-title">
          {editMode ? 'Edit Candidate' : 'Add New Candidate'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="admin-portal-form-grid">
            <div className="admin-portal-form-group">
              <label className="admin-portal-form-label">Name</label>
              <input
                type="text"
                className="admin-portal-form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="admin-portal-form-group">
              <label className="admin-portal-form-label">Role</label>
              <input
                type="text"
                className="admin-portal-form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            
            <div className="admin-portal-form-group">
              <label className="admin-portal-form-label">Department</label>
              <input
                type="text"
                className="admin-portal-form-input"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            
            <div className="admin-portal-form-group">
              <label className="admin-portal-form-label">Year of Study</label>
              <input
                type="text"
                className="admin-portal-form-input"
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                required
              />
            </div>
            
            <div className="admin-portal-form-group">
              <label className="admin-portal-form-label">Photo</label>
              <input
                type="file"
                accept="image/*"
                className="admin-portal-form-file-input"
                onChange={handlePhotoChange}
                required={!editMode && !photoURL}
              />
              <p className="admin-portal-form-hint">
                {editMode && !photo && "Leave empty to keep current photo."}
              </p>
            </div>
            
            {photoURL && (
              <div className="admin-portal-preview-container">
                <label className="admin-portal-form-label">Photo Preview</label>
                <img
                  src={photoURL}
                  alt="Candidate Preview"
                  className="admin-portal-preview-image"
                />
              </div>
            )}
          </div>
          
          <div className="admin-portal-actions">
            <button
              type="submit"
              className="admin-portal-button admin-portal-button-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="admin-portal-loader"></span>
                  Processing...
                </>
              ) : (
                editMode ? 'Update Candidate' : 'Add Candidate'
              )}
            </button>
            
            {editMode && (
              <button
                type="button"
                className="admin-portal-button admin-portal-button-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div className="admin-portal-card">
        <h2 className="admin-portal-card-title">Manage Candidates</h2>
        
        {loading && !candidates.length ? (
          <p className="admin-portal-loading-text">Loading candidates...</p>
        ) : !candidates.length ? (
          <p className="admin-portal-empty-text">No candidates found. Add some candidates to get started.</p>
        ) : (
          <div className="admin-portal-table-container">
            <table className="admin-portal-table">
              <thead className="admin-portal-table-header">
                <tr>
                  <th className="admin-portal-table-header-cell">Photo</th>
                  <th className="admin-portal-table-header-cell">Name</th>
                  <th className="admin-portal-table-header-cell">Role</th>
                  <th className="admin-portal-table-header-cell">Department</th>
                  <th className="admin-portal-table-header-cell">Year</th>
                  <th className="admin-portal-table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={candidate.id} className="admin-portal-table-row">
                    <td className="admin-portal-table-cell">
                      {candidate.photo ? (
                        <img
                          src={candidate.photo}
                          alt={candidate.name}
                          className="admin-portal-avatar"
                        />
                      ) : (
                        <div className="admin-portal-avatar-placeholder">
                          <span className="admin-portal-avatar-placeholder-text">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="admin-portal-table-cell">{candidate.name}</td>
                    <td className="admin-portal-table-cell">{candidate.role}</td>
                    <td className="admin-portal-table-cell">{candidate.department}</td>
                    <td className="admin-portal-table-cell">{candidate.yearOfStudy}</td>
                    <td className="admin-portal-table-cell">
                      <button
                        onClick={() => handleEdit(candidate)}
                        className="admin-portal-edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(candidate.id)}
                        className="admin-portal-delete-button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => moveCandidate(index, 'up')}
                        className="admin-portal-move-button"
                        disabled={index === 0}
                      >
                        Move Up
                      </button>
                      <button
                        onClick={() => moveCandidate(index, 'down')}
                        className="admin-portal-move-button"
                        disabled={index === candidates.length - 1}
                      >
                        Move Down
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;