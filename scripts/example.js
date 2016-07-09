var Loader = React.createClass({
  render: function() {
    return (
      <div className={"loader "+ this.props.classes}></div>
    );
  }
});

var ImageBox = React.createClass({
  getInitialState: function() {
  	return {
      src: 'http://lorempixel.com/g/200/200?' + Math.random(),
      loaderClass: ''
    };
  },
  handleBtnClick: function() {
  	this.setState({ loaderClass: '' });
  	this.setState({ src: 'http://lorempixel.com/g/200/200?' + Math.random() });
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
    return (
      <div className="imageBox">
        <span><p onClick={this.handleTextClick}>{this.props.text}</p></span>
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
  render: function() {
  	var images = [], numOfImages = 30, rowSize = 3, size;
  	for (var i = 1; i < numOfImages + 1; i++) {
  		images.push(i);
  	}
  	size = window.innerWidth / rowSize - 12;
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


