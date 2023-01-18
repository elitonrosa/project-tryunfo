import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    hasTrunfo: false,
    cards: [],
    cardFilter: 'todas',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.validaForm());
  };

  validaForm = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;
    const max = 90;
    const min = 0;
    const maxSome = 210;
    const someOfAttr = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);

    if (
      cardName
      && cardDescription
      && cardImage
      && cardRare
      && Number(cardAttr1) <= max
      && Number(cardAttr2) <= max
      && Number(cardAttr3) <= max
      && Number(cardAttr1) >= min
      && Number(cardAttr2) >= min
      && Number(cardAttr3) >= min
      && someOfAttr <= maxSome
    ) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  };

  resetInputs = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  };

  onSaveButtonClick = () => {
    const card = { ...this.state };
    if (card.cardTrunfo === true) {
      this.setState({
        hasTrunfo: true,
      });
    }
    delete card.isSaveButtonDisabled;
    delete card.cards;
    this.setState((prevState) => ({
      cards: [...prevState.cards, card],
    }), () => this.resetInputs());
  };

  removeCard = (name) => {
    const { cards } = this.state;
    const newCards = cards.filter((card) => card.cardName !== name);
    if (newCards.some((card) => card.cardTrunfo)) {
      this.setState({
        cards: newCards,
      });
    } else {
      this.setState({
        cards: newCards,
        hasTrunfo: false,
      });
    }
  };

  render() {
    const { cards, cardFilter } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } hasBtn={ false } removeCard={ this.removeCard } />
        <div>
          <select
            name="cardFilter"
            data-testid="rare-filter"
            value={ cardFilter }
            onChange={ this.onInputChange }
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
          {cards
            .filter((card) => {
              if (cardFilter === 'todas') {
                return card;
              }
              return card.cardRare === cardFilter;
            })
            .map((card, index) => (
              <Card
                key={ index }
                { ...card }
                hasBtn
                removeCard={ this.removeCard }
              />))}
        </div>
      </div>
    );
  }
}

export default App;
