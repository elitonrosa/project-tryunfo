import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (
      <div>
        <label htmlFor="cardName">
          Nome da Carta
          <input name="cardName" type="text" data-testid="name-input" />
        </label>
        <label htmlFor="cardDescription">
          Descrição da Carta
          <textarea name="cardDescription" data-testid="description-input" />
        </label>
        <label htmlFor="attr01">
          Attr01
          <input name="attr01" type="number" data-testid="attr1-input" />
        </label>
        <label htmlFor="attr02">
          Attr02
          <input name="attr02" type="number" data-testid="attr2-input" />
        </label>
        <label htmlFor="attr03">
          Attr03
          <input name="attr03" type="number" data-testid="attr3-input" />
        </label>
        <label htmlFor="cardImage">
          Imagem
          <input name="cardImage" type="text" data-testid="image-input" />
        </label>
        <select data-testid="rare-input">
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>
        <label htmlFor="checkbox">
          <input type="checkbox" name="checkbox" data-testid="trunfo-input" />
          Super Trybe Trunfo
        </label>
        <button type="button" data-testid="save-button">Salvar</button>
      </div>
    );
  }
}
