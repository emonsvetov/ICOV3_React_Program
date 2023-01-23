import React from "react";
const FAQS = [
  "The registration fee is $425. It may be billed on account or can be paid by check. The fee will not offset the dollars billed at the end of the program for unearned points. The part number that will appear on your invoice will be “2023TRIPREG.”",
  "Registration deadline is April 1, 2023. After that date, it is first come, first served.",
  "If you must cancel, you will lose your registration fee and may be subject to other costs of cancellation. If you change someone on your list of attendees after registration is complete, you will be billed at the actual cost of the change fees.",
  "Each participating customer's point balance will be updated monthly and available to each customer behind a password protected website. The Crescent Parts sales people can assist you with viewing this information and discuss with you opportunities to grow your point balance.",
  "You will need to earn 400 points to earn a trip for two people. The points have no monetary value, will not roll over to the next year, and cannot be transferred to anyone else.",
  "Your Crescent Parts Sales Person can inform you throughout the year of opportunities to earn bonus points.",
  "You will receive double points during various promotional programs taking place throughout the year.",
  "You will receive one point for every $1000 of purchases done with Crescent Parts from 10/1/22 – 9/30/23 up to your Base level. You will receive two points for every $1000 of purchases above your Base level.",
  "Crescent Parts will invoice any unearned points at $25 per point in October 2023. The part number that will appear on your invoice will be “2023TRIP.”",
  "Your account must be current or you will not qualify for the trip. If this unfortunate situation occurs, you will be notified by October 1, 2023. If your account is not promptly brought up to date, you will lose your registration fee and will not be allowed to attend.",
];

export const Queries = () => (
  <div className="queries">
    {FAQS.map((item, index) => {
      return (
        <div className="d-flex mt-3" key={index}>
          <div className="mx-2">
            {`${index + 1}. `} {item}
          </div>
        </div>
      );
    })}
  </div>
);
