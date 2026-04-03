import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutWrapper>
            <LogoutContainer>
                <UserAvatar>{currentUser.name.charAt(0)}</UserAvatar>
                <h2>Goodbye, {currentUser.name}! 👋</h2>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonContainer>
                    <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                    <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
                </ButtonContainer>
            </LogoutContainer>
        </LogoutWrapper>
    );
};

export default Logout;

// Styled Components
const LogoutWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(to right, #3a3d98, #493973); /* Blue-Purple Gradient */
`;

const LogoutContainer = styled.div`
  width: 600px;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  background: linear-gradient(to right,#1976d2,rgb(91, 170, 249)); 
 position: absolute; /* Ye ensure karega ki box move na ho */
 margin-top:-50px
`;

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  color: #3a3d98;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto 15px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.3);
`;

const LogoutMessage = styled.p`
  font-size: 18px;
  margin: 20px 0;
  opacity: 0.9;

`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const LogoutButton = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: none;
  outline: none;
  width: 120px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #d32f2f;
  color: white;

  &:hover {
    background-color: #b71c1c;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color:rgb(187, 216, 56);
  color: white;

  &:hover {
    background-color: rgb(151, 176, 38);
  }
`;
