import React from 'react';
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
      </div>
    );
  }
}

export default App;
