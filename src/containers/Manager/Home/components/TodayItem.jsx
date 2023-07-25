import React from 'react';
import {Col, Row} from 'reactstrap';
import RedeemIcon from 'mdi-react/TrophyIcon';
import UsersIcon from 'mdi-react/AccountGroupIcon';
//type 0: awards or redemptions
//      1: active participants                                                                                                                    

const TodayItem = (props) => {
  const {title, today, ytd, mtd, type} = props.data;
  const {index} = props;
  return (
    <div className={`rounded-panel today-panel index-${index} d-flex flex-column`}>
      <h4>{title}</h4>
      <Row className='mb-2'>
        <Col md={6}>
          <div className='d-flex'>
            {
              title == "Today's Active Participants" ?
                <UsersIcon size={50} className="award-icon"/> :
                <RedeemIcon size={50} className="award-icon"/>
            }

            <div className='d-flex flex-column'>
              <h3 className='color m-0'>{today.value.toLocaleString()}</h3>
              {type !== 'users' && <span>Points</span>}
            </div>
          </div>
        </Col>
        <Col md={6}>
          {today.amount &&
            <div className='d-flex flex-column'>
              <h3 className='color m-0'>${today.amount?.toFixed(2)}</h3>
            </div>
          }
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className='d-flex flex-column mtd'>
            <strong>MTD</strong>
            {type === 'users' ?
              <span>{mtd.value.toLocaleString()}</span>
              :
              <>
                <span>{mtd.value.toLocaleString()} Points</span>
                <span>${mtd.amount?.toFixed(2)}</span>
              </>
            }
          </div>
        </Col>
        <Col md={6}>
          <div className='d-flex flex-column ytd'>
            <strong>YTD</strong>
            {type === 'users' ?
              <span>{ytd.value.toLocaleString()}</span>
              :
              <>
                <span>{ytd.value.toLocaleString()} Points</span>
                <span>${ytd.amount?.toFixed(2)}</span>
              </>
            }
          </div>
        </Col>
      </Row>

    </div>

  )
}

export default TodayItem;
