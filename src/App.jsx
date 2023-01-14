import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  onInputChange = () => {

  };

  onSaveButtonClick = () => {

  };

  render() {
    const infos = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: false,
    };

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...infos }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...infos } />
      </div>
    );
  }
}

export default App;
