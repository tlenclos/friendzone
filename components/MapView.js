import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet-universal';
import map from 'lodash/map';

let L = null;
let terminator = null;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  terminator = require('leaflet-terminator');
}

class MapView extends Component {
  state = {
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    marker: {
      lat: 51.505,
      lng: -0.09,
    },
    draggable: true,
  }

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable })
  }

  updatePosition = (element) => {
    const { lat, lng } = element.target._latlng
    this.setState({
      marker: { lat, lng },
    })
  }

  render () {
    const { people } = this.props
    const position = [this.state.center.lat, this.state.center.lng]
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]

    return (
      <Map
        center={position}
        zoom={3}
        ref="map"
        whenReady={(element) => {
          const mapInstance = element.target.boxZoom._map;
          terminator()
            .setStyle({
              weight: 1,
              color: '#000',
              fill: '#000'
            }).addTo(mapInstance);
      }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {L && Object.keys(people).length > 0 &&
          map(people, (person, key) =>
            <Marker
              key={key}
              draggable={this.state.draggable}
              onDragend={this.updatePosition}
              position={markerPosition}
              ref="marker"
              icon={L.divIcon({
                className: 'friend-marker',
                html: `
                    <img src="https://fb-s-b-a.akamaihd.net/h-ak-fbx/v/t1.0-1/c0.0.320.320/p320x320/18268113_10212656488111242_7946029133833942165_n.jpg?oh=8bf4140b79b4a3661fe9a9c0b36c314d&oe=59BA6BB7&__gda__=1503936358_835ffcc4c50ac1675df665cd2482eb13">
                `
              })}>
                <Popup minWidth={90}>
                <span onClick={this.toggleDraggable}>
                {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                </span>
                </Popup>
            </Marker>
        )}
      </Map>
    )
  }
}

const mapStateToProps = ({ people }) => ({ people })

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
