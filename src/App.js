import React, { Component } from 'react';
import './App.css';

//To render images returned by Flickr API
function renderImages(items) {
  return (
    items.map((x, i) => {
      return (
        <img key={x.link} src={x.media.m} width='250' height='250'></img>
      )
    })
  );

}

class App extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      input: '',
      url: 'https://www.flickr.com/services/feeds/photos_public.gne?tags=puppy&format=json&nojsoncallback=true',
    }

    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount() {
    //On initialization get Puppy images
    this.getPhotos();
  }

  getPhotos() {
    fetch(this.state.url)
      .then(response => response.json())
      .then(jsonData => jsonData.items)
      .then(jsonStr => this.setState({ items: jsonStr }));
  }

  //Set input in state as data is entered into the input field
  handleChange = (e) => {
    this.setState({ input: e.target.value });
    if (e.target.value) {
      this.setState({ url: `https://www.flickr.com/services/feeds/photos_public.gne?tags= + ${e.target.value}+&format=json&nojsoncallback=true` })
    }
    else {
      //if input id empty fetch puppy images
      this.setState({ url: `https://www.flickr.com/services/feeds/photos_public.gne?tags=puppy&format=json&nojsoncallback=true` })
    }
  }

  //Call API on button click to fetch images of data entered in the input box
  handleClick = () => {
    console.log(this.state.input);
    this.getPhotos();
  }

  render() {
    const { items } = this.state;

    return (
      <div className="flickr">
        <header className="header">
          <h2>Varshila Redkar</h2>
        </header>

        <div className="search">
          <input className="searchBox" type="text" placeholder="Puppy" onChange={this.handleChange} />
          <button className="searchButton" onClick={this.handleClick}>Search</button>
        </div>

        {renderImages(items)}

        <footer className="footer">
          <p>Images retrieved using the Flickr Public API
          Designed for the Kapsch Interview Process</p>
          <span>April 16, 2020</span>
        </footer>
      </div>

    );
  }
}

export default App;
