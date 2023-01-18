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
    nameFilter: '',
    disableFilters: false,
    superTrunfoFilter: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.validaForm();
      if ([name][0] === 'superTrunfoFilter') {
        this.trunfoFilter();
      }
    });
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

  trunfoFilter = () => {
    const { superTrunfoFilter } = this.state;
    if (superTrunfoFilter) {
      this.setState({
        disableFilters: true,
      });
    } else {
      this.setState({
        disableFilters: false,
      });
    }
  };

  render() {
    const {
      cards,
      cardFilter,
      nameFilter,
      disableFilters,
      superTrunfoFilter,
    } = this.state;

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
          <div>
            <input
              type="text"
              name="nameFilter"
              data-testid="name-filter"
              value={ nameFilter }
              onChange={ this.onInputChange }
              disabled={ disableFilters }
            />
            <select
              name="cardFilter"
              data-testid="rare-filter"
              value={ cardFilter }
              onChange={ this.onInputChange }
              disabled={ disableFilters }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
            <label htmlFor="superTrunfoFilter">
              <input
                type="checkbox"
                name="superTrunfoFilter"
                data-testid="trunfo-filter"
                checked={ superTrunfoFilter }
                onChange={ this.onInputChange }
              />
              <span>Super Trunfo</span>
            </label>
          </div>
          {
            superTrunfoFilter ? (
              cards
                .filter((card) => card.cardTrunfo)
                .map((cardTrunfo, index) => (<Card
                  key={ index }
                  { ...cardTrunfo }
                  hasBtn
                  removeCard={ this.removeCard }
                />))
            ) : (
              cards
                .filter((card) => {
                  if (cardFilter === 'todas') {
                    return card;
                  }
                  return card.cardRare === cardFilter;
                })
                .filter((card) => card.cardName.includes(nameFilter))
                .map((card, index) => (
                  <Card
                    key={ index }
                    { ...card }
                    hasBtn
                    removeCard={ this.removeCard }
                  />))
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
