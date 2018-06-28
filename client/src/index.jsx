import ModalConductor from './components/ModalConductor.jsx';


const React = require('react');

const reactDOM = require('react-dom');

const axios = require('axios');

const listingId = window.location.pathname.split('/')[2];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listingName: null,
      currentPictures: [],
      backGroundwasClicked: false,
      backgroundImage: null,
    };
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  componentDidMount() {
    this.getData(listingId);
  }

  async getData (id) {
    try {
      const name = await axios.get(`/listings/${id}`)
        .then(response => response.data[0].name);

      const pictures = await axios.get(`/listings/${id}/pictures`)
      .then(response => {
        console.log('response.data', response.data)
        return response.data
      });

      this.setState({
        listingName: name,
        currentPictures: pictures,
        backgroundImage: pictures[0].src,
      });
    } catch(err) {
      console.error(err);
    }
  }

  handleBackgroundClick() {
    this.setState({
      backGroundwasClicked: !this.state.backGroundwasClicked
    });
  }

  render() {
    const AppStyle = {
      margin: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      overflow: 'hidden',
      backgroundImage: `url('${this.state.backgroundImage}')`,
      width: '100%',
      height: '600px',
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
    };

    return (
      <div style={AppStyle}>
        <ModalConductor
          onClick={this.handleBackgroundClick}
          name={this.state.listingName}
          currentPictures={this.state.currentPictures}
          backgroundClicked={this.state.backGroundwasClicked}
          backgroundImage={this.state.backgroundImage}
        />
      </div>
    );
  }
}

reactDOM.render(<App />, document.getElementById('carousel-module'));
