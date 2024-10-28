// src/components/Navigation/NavSidebar.js
import React from 'react';
import styled from 'styled-components';
import instagram from '../../assets/images/instagram.png';
import home from '../../assets/images/home.png';
import search from '../../assets/images/search.png';
import explore from '../../assets/images/explore.png';
import reels from '../../assets/images/reels.png';
import dm from '../../assets/images/dm.png';
import heart from '../../assets/images/heart.png';
import post from '../../assets/images/post.webp';
import profile from '../../assets/images/profile.png';
import more from '../../assets/images/more.png';

const NavContainer = styled.div`
  width: 73px;
  height: 100vh;
  border-right: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const NavItem = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const NavSidebar = () => {
    const navItems = [
        { icon: instagram, alt: 'Instagram' },
        { icon: home, alt: 'Home' },
        { icon: search, alt: 'Search' },
        { icon: explore, alt: 'Explore' },
        { icon: reels, alt: 'Reels' },
        { icon: dm, alt: 'Messages' },
        { icon: heart, alt: 'Notifications' },
        { icon: post, alt: 'Create' },
        { icon: profile, alt: 'Profile' },
        { icon: more, alt: 'More' }
    ];

    const handleClick = (alt) => {
        console.log(`Clicked ${alt}`);
        // 필요한 경우 여기에 네비게이션 로직 추가
    };

    return (
        <NavContainer>
            {navItems.map((item, index) => (
                <NavItem key={index} onClick={() => handleClick(item.alt)}>
                    <NavIcon src={item.icon} alt={item.alt} />
                </NavItem>
            ))}
        </NavContainer>
    );
};

export default NavSidebar;