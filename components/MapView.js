import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import map from 'lodash/map';

import { editPerson } from '../store'

// Leaflet hack import without SSR
let L = null;
let terminator = null;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  require('./../lib/L.Terminator')
}

class MapView extends Component {
  state = {
    center: {
      lat: 0,
      lng: 0,
    },
    defaultMarkerPosition: {
      lat: 0,
      lng: 0
    }
  }
  terminator = null

  updatePosition = (element, person) => {
    person.position = element.target._latlng;
    this.props.editPerson(person)
  }

  getHtmlForMarker(person) {
    if (person.image) {
      return `<img src="${person.image}">`
    } else {
      return person.name
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.terminator && nextProps.visible) {
      this.terminator.redraw();
    }
  }

  render () {
    const { people } = this.props
    const position = [this.state.center.lat, this.state.center.lng]
    const defaultMarkerPosition = [this.state.defaultMarkerPosition.lat, this.state.defaultMarkerPosition.lng]
    // TODO Center map on markers

    return (
      <Map
        center={position}
        zoom={2}
        ref="map"
        whenReady={(element) => {
          const mapInstance = element.target.boxZoom._map;
          this.terminator = L.terminator({
            color: '#ddd',
            opacity: 0.1,
            resolution: 5
          });
          this.terminator.addTo(mapInstance);
      }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;https://sosm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {L && people && Object.keys(people).length > 0 &&
          map(people, (person, key) =>
            <Marker
              key={key}
              draggable={true}
              onDragend={(element) => this.updatePosition(element, person)}
              position={person.position ? [person.position.lat, person.position.lng] : defaultMarkerPosition}
              ref="marker"
              icon={L.divIcon({
                className: 'friend-marker',
                html: this.getHtmlForMarker(person)
              })}>
            </Marker>
        )}
      </Map>
    )
  }
}

const mapStateToProps = ({ people }) => ({ people })

const mapDispatchToProps = (dispatch) => {
  return {
    editPerson: bindActionCreators(editPerson, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapView)
