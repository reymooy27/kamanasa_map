import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript,MarkerF} from '@react-google-maps/api';
import Link from 'next/link';

export type Position = {
  lat: number;
  lng: number;
}

export type MarkerType = {
  id: number;
  position: Position;
  name: string;
  age: number;
  gender: string;
  disabilities: string;
}

const Home = ()=>{

  
  const containerStyle = {
  width: '800px',
  height: '100vh'
};

const markers = [
  {
    id: 1,
    position: { lat: -9.5400457, lng: 124.9194263 },
    name: 'Alvianus Kale',
    age: 23,
    gender: 'Pria',
    disabilities: 'Buta'
  },
  {
    id: 2,
    position: { lat: -9.5449727, lng: 124.9181433 },
    name: 'Aldo Kalelado',
    age: 23,
    gender: 'Pria',
    disabilities: 'Buta Warna'
  },
  // {
  //   id: 4,
  //   name: "New York, New York",
  //   position: { lat: 40.712776, lng: -74.005974 }
  // }
];

  const [activeInfoWindow, setActiveInfoWindow] = useState<MarkerType>()
  const [infoOpen, setInfoOpen] = useState(false)
  const [zoom, setZoom] = useState(13)
  const [zoomChanged, setZoomChanged] = useState(false)
  const [centerMap, setCenterMap] = useState({
    lat: -9.5394287,
    lng: 124.9129503
  })


  const handleClickMarker = (marker: MarkerType)=>{
    setActiveInfoWindow(marker)
    setZoom(16)
    
    setCenterMap(marker.position)
  }

  // const handleClickMap = (e: React.MouseEvent<HTMLElement>)=>{
  //   console.log(e)
  // }


  return(
    <div className='w-full h-full flex'>

      <div className='w-[60%] h-screen'>
        <LoadScript
            googleMapsApiKey={'AIzaSyCk2H7Tdl_48W4XjqS4sgulCkPyRQqcFS4'}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={zoom}
              center={centerMap}
              // onClick={handleClickMap}
              options={
                {zoomControl: false, minZoom: 13}
              }
            >
              {markers.map((marker: MarkerType) => (
                <MarkerF
                  key={marker.id}
                  position={marker.position}
                  onClick={() => handleClickMarker(marker)}
                >
                </MarkerF>
              ))}
            </GoogleMap>
        </LoadScript>
      </div>
      
      <div className='w-[40%] h-screen sticky top-0 overflow-y-auto'>
        <div>
          <h1>Desa Kamanasa</h1>
        </div>
        <div>
          <Link href='/add-data-disabilities'>
            <a>Data Disabilitas</a>
          </Link>
        </div>
        <div className='h-[500px]'>
          <div className='w-full h-full '>
            {activeInfoWindow && 
            
            <table className='border-collapse w-full border border-black'>
              <tr>
                <td>Nama</td>
                <td>{activeInfoWindow?.name}</td>
              </tr>
              <tr>
                <td>Umur</td>
                <td>{activeInfoWindow?.age}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td>{activeInfoWindow?.gender}</td>
              </tr>
              <tr>
                <td>Disabilitas</td>
                <td>{activeInfoWindow?.disabilities}</td>
              </tr>
            </table>
            }

          </div>
        </div>
      </div>                  
    </div>
  )
}

export default Home