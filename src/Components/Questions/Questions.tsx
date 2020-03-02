import React from 'react';
import {Question} from '../../models/Models';
import firebase from 'firebase/app';
import _ from 'lodash';
import 'firebase/auth';
import 'firebase/database';

interface Props {
  userId: string;
}

interface State {
  data: {[key: string]: Question};
  answers: {[key: string]: string};
}

export class Questions extends React.Component<any, Partial<State>> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  updateStateWithData(data: firebase.database.DataSnapshot, command: string) {
    console.log(command, '-> Questions ->', data.key, ':', data.val())
    if (data.key) {
      const newData = this.state.data || {};
      const key: string = data.key;
      newData[key] = data.val();
      this.setState({data: newData});
    }
  }

  updateAnswersStateWithData(data: firebase.database.DataSnapshot, command: string) {
    console.log(command, '-> Answers ->', data.key, ':', data.val())
    if (data.key) {
      const newData = this.state.answers || {};
      const key: string = data.key;
      newData[key] = data.val();
      this.setState({answers: newData});
    }
  }

  componentDidMount() {
    const questionsRef = firebase.database().ref('questions');
    questionsRef.on('child_added', (data) => this.updateStateWithData(data, 'ADD'), this.handleError);
    questionsRef.on('child_changed', (data) => this.updateStateWithData(data, 'CHANGE'), this.handleError);
    questionsRef.on('child_removed', (data) => this.updateStateWithData(data, 'REMOVE'), this.handleError);

    const answersRef = firebase.database().ref(`answers/${this.props.userId}`);
    answersRef.on('child_added', (data) => this.updateAnswersStateWithData(data, 'ADD'), this.handleError);
    answersRef.on('child_changed', (data) => this.updateAnswersStateWithData(data, 'CHANGE'), this.handleError);
    answersRef.on('child_removed', (data) => this.updateAnswersStateWithData(data, 'REMOVE'), this.handleError);
  }

  storeAnswer(userId: string, questionId: string, answerId: string): void {
    console.log(`Record ${answerId} for user ${userId} for question ${questionId}`);

    const answersRef = firebase.database().ref(`answers/${userId}`);
    answersRef.update({[questionId]: answerId});
  }

  handleError(errorObject: any) {
    console.log('ERROR', errorObject);
  }

  render() {
    const { data, answers } = this.state;

    if (!data) {
      return <div className="section">Loading</div>;
    }

    return (
      <div className="section">
        <h2 className="subtitle">Questions</h2>
        {Object.keys(data).map((key, index) => 
          <SingleQuestion 
            key={`question-${index}`} 
            userId={this.props.userId} 
            questionId={key} 
            questionData={data[key]} 
            storeAnswerCallback={this.storeAnswer}
            answers={answers}
          />)}
      </div>
    );
  }
}

interface QProps {
  userId: string;
  questionId: string;
  questionData: Question;
  answers: any;
  storeAnswerCallback: (userId: string, questionId: string, answerId: string) => void;
}

const SingleQuestion = ({userId, questionId, questionData, storeAnswerCallback, answers}: QProps) => {
  console.log('Question', questionData);
  console.log('Answer for this question exists? ', answers && answers[questionId] ? answers[questionId]: 'no');
  const selectedAnswer = _.get(answers, questionId, '');
  return (
    <div id={questionId}>
      <div>{questionData.orderNumber}. {questionData.text.fi}</div>
      <div>
        {Object.keys(questionData.choices).map((key, index) => {
          return (
            <AnswerButton 
              userId={userId}
              questionId={questionId}
              answerId={key}
              answerText={questionData.choices[key].fi}
              key={`${questionId}-${questionData.orderNumber}-${index}`}
              storeAnswerCallback={storeAnswerCallback}
              selectedAnswer={selectedAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}

interface AProps {
  userId: string;
  questionId: string;
  answerId: string;
  answerText: string;
  selectedAnswer: string;
  storeAnswerCallback: (userId: string, questionId: string, answerId: string) => void;
}

const AnswerButton = ({userId, questionId, answerId, answerText, storeAnswerCallback, selectedAnswer}: AProps) => {
  return (
    <div 
      className={`button is-outlined ${selectedAnswer === answerId ? 'is-success' : ''}`}
      onClick={() => {
        storeAnswerCallback(userId, questionId, answerId);
      }}
      >
        {answerText}
    </div>
  )
}