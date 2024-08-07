import React from "react";
const FAQS = [
  {
    question: "What is the Rewards Program?",
    answer:
      "Your Rewards Program is a loyalty and rewards program that awards points to participants for various activities. Points can be redeemed at name-brand merchants participating in the program. Your rewards program is similar to most rewards and loyalty programs found in the consumer marketplace.",
  },
  {
    question: "How do I sign up?",
    answer:
      " To participate in the Rewards program, an email address is required and must be given to your program representative. Once we have your email address, you will be sent an email with a link to set-up your account.",
  },
  {
    question: "How do I access my account?",
    answer:
      " After you create your password, you can log into your account at the web address provided to you. Once logged in, you will be directed to your very own home page where you can see how many points you've earned, get messages from your program representative and go shopping!",
  },
  {
    question: "How do I earn points?",
    answer:
      " Your program representative will communicate how you can earn points in your program.",
  },
  {
    question: "How do I redeem my points?",
    answer:
      "You can redeem your points on your personal home page. There are 3 easy steps: Select a merchant...Select the amount of points you want to redeem...then select 'Redeem Points'. You will receive a gift code in the 'My Gift Codes' section of your account. Write down or copy the code and enter it into the 'enter gift code' in the shopping cart at check out of the merchant you've selected. Please remember that most codes can only be used with on-line shopping.",
  },
  {
    question: "Do my points expire?",
    answer:
      " As long as you are a user with the program that has awarded you points, your points will expire on December 31st of the year following the year in which the points were awarded. This allows you at least 12 months to redeem points. If you decide to leave the program, you have 14 days to use your points.",
  },
  {
    question: "Can I give my points to someone else?",
    answer:
      " Points are only awarded to the person's name that registered their account. However, once you've redeemed your points for a gift code, you can give the code to whomever you like.",
  },
  {
    question: "Where can I redeem my points?",
    answer:
      " Our national merchants offer millions of products and brands. You can shop on-line or in-store (if applicable). Please visit your home page for our current merchant list.",
  },
  {
    question: "Can I redeem my points for gift cards?",
    answer: " Gift codes can be used for any product the merchant offers.",
  },
  {
    question: "Who do I call with questions?",
    answer:
      " Contact your program representative if you have questions regarding how you can earn points. Contact the merchant where you are redeeming your points if you have questions about products, shipping, gift codes, etc. If you have questions or need assistance related to your Rewards program. Please contact us by using the Support link that is at the top of their Home page. If you would like to call our Support Desk at 1-303-325-2647 and pick option #2.",
  },
  {
    question: "How print my gift code?",
    answer:
      'To print your digital gift certificate, select the "Print" button or hold down the "Control Key (ctrl)" and the letter "P" on your keyboard at the same time.',
  },
];

const FAQS_ORIGIN = [
  {
    question: "How does my Program work?",
    answer:
      " You have the ability to earn rewards for completing various activities. You can redeem your rewards for gift codes to be used at retail merchants or for specific products or services in your Rewards Super Center.",
  },
  {
    question: "How do I earn rewards?",
    answer:
      " There are several ways you can earn rewards. Please contact your program administrator for your program details.",
  },
  {
    question: "Where can I see my available reward balance?",
    answer:
      " On your home page, you can select the navigation tab in the upper right corner labeled “My Rewards” to view your balance or on the left side of your home page under ‘My Balance’.",
  },
  {
    question: "How do I redeem my rewards?",
    answer:
      " You can redeem your rewards for gift codes to be used at retail merchants or for specific products or services from the Rewards Super Center. Upon selecting ‘Redeem My Rewards’ you will have an option to either redeem your rewards for gift codes to be used at US merchants or to redeem for merchandise, events, travel, etc. in the “Rewards Super Center”.",
  },
  {
    question: "Do my rewards expire?",
    answer:
      "Yes. You can redeem your points on your personal home page. There are 3 easy steps: Select a merchant...Select the amount of points you want to redeem...then select 'Redeem Points'. You will receive a gift code in the 'My Gift Codes' section of your account. Write down or copy the code and enter it into the 'enter gift code' in the shopping cart at check out of the merchant you've selected. Please remember that most codes can only be used with on-line shopping.",
  },
  {
    question: "Do my points expire?",
    answer:
      " As long as you are a current participant, your rewards will expire on December 31st of the year following the year in which the amount was awarded. This allows you at least 12-24 months to redeem your rewards.",
  },
  {
    question: "Can I give my rewards to someone else?",
    answer:
      " Rewards are only awarded to the person that registered their account. However, once you've redeemed your rewards for a gift code, you can give the code to whomever you like (US only).",
  },
  {
    question: "Who do I call with questions?",
    answer:
      " Contact your program representative if you have questions regarding how you can earn rewards. Contact INCENTCO Customer Service for other information or help at support@incentco.zendesk.com",
  },
];

export const Queries = () => (
  <div className="queries">
    {FAQS.map((item, index) => {
      return (
        <div className="d-flex mt-3" key={index}>
          <div className="mx-2">{`${index + 1}.`}</div>
          <div>
            <strong>{item.question}</strong> {item.answer}
          </div>
        </div>
      );
    })}
  </div>
);

export const QueriesOrigin = () => (
  <div className="queries">
    {FAQS_ORIGIN.map((item, index) => {
      return (
        <div className="d-flex mt-3" key={index}>
          <div className="mx-2">{`${index + 1}.`}</div>
          <div>
            <strong>{item.question}</strong> {item.answer}
          </div>
        </div>
      );
    })}
  </div>
);
