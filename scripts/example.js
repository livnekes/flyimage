var Loader = React.createClass({
  render: function() {
    return (
      <div className={"loader "+ this.props.classes}></div>
    );
  }
});

var ImageBox = React.createClass({
  randomPic: function() {
    return 'https://unsplash.it/200/200/?random&' + Math.random();
  },
  getInitialState: function() {
  	return {
      src: this.randomPic(),
      loaderClass: ''
    };
  },
  handleBtnClick: function() {
  	this.setState({ loaderClass: '' });
  	this.setState({ src: this.randomPic() });
  },
  handleTextClick: function() {
  	this.setState({ loaderClass: '' });
  },
  handleImageLoaded: function() {
  	this.setState({ loaderClass: 'hide' });
  },
  handleImageErrored: function() {
  	this.setState({ loaderClass: 'hide' });
  	this.setState({ src: 'error.jpeg' });
  },
  render: function() {
    var hide = { display: 'none' }
    return (
      <div className="imageBox">
        <span><p onClick={this.handleTextClick}>{this.props.text}</p></span>
        <p style={hide}>{this.props.size}</p>
        <img src={this.state.src} 
        	 width={this.props.size}
        	 height={this.props.size}
           onLoad={this.handleImageLoaded}
           onError={this.handleImageErrored}/>
        <Loader classes={this.state.loaderClass}/>
        <a><button onClick={this.handleBtnClick}>click me!</button></a>
      </div>
    );
  }
});

var GalleryBox = React.createClass({
  calcSize: function(rowSize) {
    return window.innerWidth / rowSize - 12;
  },
  getInitialState: function() {
    var images = [], numOfImages = 30, rowSize = 5;
    for (var i = 1; i < numOfImages + 1; i++) {
      images.push(i);
    }
    return {
      rowSize: rowSize,
      size: this.calcSize(rowSize),
      images: images
    };
  },
  handleResize: function(e) {
    this.setState({size: this.calcSize(this.state.rowSize)});
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },
  render: function() {
    var images, size;
    images = this.state.images;
    size = this.state.size;
    return (
      <div className="galleryBox">
      	{images.map(function(i) {
            return <ImageBox key={i} text={"image #"+i} size={size}/>;
      	})}
      </div>
    );
  }
});

ReactDOM.render(
  <GalleryBox />,
  document.getElementById('gallery')
);


