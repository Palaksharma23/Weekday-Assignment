import React from 'react';
import Tag from '../../ui/Tag';
import AboutCompany from './AboutCompany';
import Button from '../../ui/Button';


function CardItem() {
  return (
    <div>
      <Tag type="Primary"></Tag>
      <div>
        <div>
          <img src=""></img>
        </div>
        <div>
          <p>Ema</p>
          <p>Software Productivity Engineer</p>
        </div>
      </div>
      <p>Bangalore</p>
      <p>Estimated Salary: 30 - 50 LPA 🎫</p>
      <AboutCompany></AboutCompany>
      <p>Bangalore</p>
      <p>Estimated Salary: 30 - 50 LPA 🎫</p>
      <Button>Easy Apply</Button>
      <Button>Unlock Referral asks</Button>
    </div>
  );
}

export default CardItem