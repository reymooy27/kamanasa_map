import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript,MarkerF, PolygonF, Polygon} from '@react-google-maps/api';
import Link from 'next/link';
import Head from 'next/head'
import { markers, MarkerType } from '../../data-disabilitas';
import { trpc } from '../utils/trpc';
import { useForm } from "react-hook-form";

const Home = ()=>{

  const containerStyle = {
  width: '100%',
  height: '100vh'
};

  const {register, handleSubmit, watch, formState: {errors}} = useForm()

  const [activeInfoWindow, setActiveInfoWindow] = useState<MarkerType>()
  const [infoOpen, setInfoOpen] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(13)
  const [zoomChanged, setZoomChanged] = useState(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [_markers, setMarkers] =useState<MarkerType[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [isAddActive, setIsAddActive] = useState<boolean>(false);

  const mutation = trpc.useMutation(['disabilities.add-data-disabilities'])

  const [centerMap, setCenterMap] = useState({
    lat: -9.5394287,
    lng: 124.9129503
  })

  const paths = [
    { lat: -9.521304, lng: 124.901240 },
    { lat: -9.545305, lng: 124.896076 },
    { lat: -9.544325, lng: 124.900463 }, //3
    { lat: -9.554839, lng: 124.920465 }, //4
    { lat: -9.549763, lng: 124.923713 }, //5
    { lat: -9.548796, lng: 124.929474 }, //6
    { lat: -9.554741, lng: 124.920624 },
    { lat: -9.521304, lng: 124.901240 },
  ]

  useEffect(() => {
    setMarkers(markers)
  }, [])
  

  const handleClickMarker = (marker: MarkerType)=>{
    setActiveInfoWindow(marker)
    setZoom(16)
    setInfoOpen(true)
    
    setCenterMap(marker.position)
  }

  // const search = (text)=>{
  //   const query = text.toLowerCase()
  //   const filteredData = fullData.filter(product=> product.productName.toLowerCase().includes(query))
  //   setProducts(filteredData)
  //   setTextInput(text)
  // }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputSearch(e.target.value)
  }

  const handleClickMap = async (e: any)=> {
    if(isAddActive){
      setMarkers((prev)=> [...prev, {
        id: 4,
        name: 'DOMINIKA BUI',
        nik: 5304084609400001,
        gender: 'Wanita',
        birthdate: '6/9/1940',
        address: 'RT 004 / RW 002, KAMANASA B, KAMANASA, MALAKA',
        position: e.latLng.toJSON(),
        disabilities: 'Tuna Netra'
      }])
    }
  }

  const onSubmit = (data)=>{

    console.log(data)

    mutation.mutate({
      name: data.name,
      nik: data.nik,
      gender: data.gender,
      // birthdate: new Date(initialInput.birthdate),
      // rt: initialInput.rt,
      // rw: initialInput.rw,
      // dusun: initialInput.dusun,
      // desa: initialInput.desa,
      // kecamatan: initialInput.kecamatan,
      // disabilities: initialInput.disabilities,
    }, {
      onSuccess(data, variables, context) {
        window.alert(data)
      },
      onError(error, variables, context) {
        window.alert(error)
      },
    })
    
    // clear input
  }


  return(
    <>
      <Head>
        <title>Desa Kamanasa - Peta</title>
      </Head>

      <div className='w-full h-full flex relative overflow-hidden'>

        <div className='w-full h-screen relative flex justify-center items-center'>

          {/* Modal */}
          <div className={`${modalOpen ? 'block' : 'hidden'} z-[9] w-full h-full bg-transparent absolute top-[70px] left-0 right-0 bottom-0 flex justify-center`}>
            <div className={`pt-[50px] shadow-xl bg-white w-[600px] h-[500px] rounded-[20px] p-5 relative`}>
              {/* close button */}
              <button 
                className='flex justify-center absolute top-[5px] right-[5px]' 
                onClick={()=> setModalOpen(false)}>
                  close
              </button>

              {/* form */}
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2'>
                {/* Name Input */}
                <input {...register('name', {required: true,})} 
                  type="text" 
                  className='rounded-xl w-[80%] h-[50px] border border-black px-3' 
                  placeholder='Nama'/>
                {/* NIK input */}
                <input {...register('nik', {valueAsNumber: true, value: 0})}
                  className='rounded-xl w-[80%] h-[50px] border border-black px-3' 
                  placeholder='NIK'/>
                {/* Gender select */}
                <select {...register('gender')}
                  className='rounded-xl w-[80%] h-[50px] border border-black px-3'>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {/* Birthdate input */}
                <input {...register('birthdate', {valueAsDate: true})}
                  type="date" 
                  className='rounded-xl w-[80%] h-[50px] border border-black px-3'/>
                {/* rt rw input */}
                <div className=''>
                  <input {...register('rt', {valueAsNumber: true})}
                    type="number" 
                    placeholder='RT' 
                    min={0} 
                    className='rounded-xl w-fit h-[40px] border border-black px-3'/>
                  <input {...register('rw', {valueAsNumber: true})}
                    type="number"
                    placeholder='RW' 
                    min={0} 
                    className='rounded-xl w-fit h-[40px] border border-black px-3'/>
                </div>
                {/* address input */}
                <div className='flex gap-1'>
                  <select {...register('dusun')}
                    placeholder='Dusun' 
                    className='rounded-xl w-fit h-[40px] border border-black px-3'>
                    <option value="Dusun">Dusun</option>
                    <option value="Fatisin A">Fatisin A</option>
                  </select>
                  <select {...register('desa')}
                    className='rounded-xl w-fit h-[40px] border border-black px-3'>
                    <option value="Desa">Desa</option>
                    <option value="Kamanasa">Kamanasa</option>
                  </select>
                  <select {...register('kecamatan')}
                    className='rounded-xl w-fit h-[40px] border border-black px-3'>
                    <option value="Kecamatan">Kecamatan</option>
                    <option value="Malaka Tengah">Malaka Tengah</option>
                  </select>
                </div>
                {/* Disablity input */}
                <input {...register('disabilities')}
                  type="text" 
                  placeholder='Ragam Disabilitas' 
                  className='rounded-xl w-[80%] h-[50px] border border-black px-3'/>
                {/* Submit button */}
                <button className='w-fit h-fit hover:bg-blue-400 bg-blue-200 p-3 rounded-xl absolute bottom-[20px] right-[20px]'>Submit</button>
              </form>
            </div>  
          </div>

          {/* Search Input */}
          <div className='absolute top-[10px] w-[300px] z-[11]'>
            <input 
            onChange={handleSearch}
            type="text" 
            value={inputSearch}
            placeholder='Nama orang' 
            className='bg-white rounded-[30px] w-full h-[40px] px-5 shadow-xl'/>
          </div>

          {/* Add button */}
          <button onClick={()=> setModalOpen(true)} className='hover:scale-[1.2] transition-all duration-300 ease-in-out shadow-xl z-[9] bg-blue-400 w-[80px] h-[80px] p-5 absolute bottom-[20px] right-[10px] rounded-[999px] flex justify-center items-center'>
            <h1 className='text-[28px]'>+</h1>
          </button>

          {/* Map */}
          <LoadScript
              googleMapsApiKey={'AIzaSyCk2H7Tdl_48W4XjqS4sgulCkPyRQqcFS4'}
              onLoad={()=> setMounted(true)}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={zoom}
                center={centerMap}
                onClick={handleClickMap}
                options={
                  { zoomControl: false, 
                    minZoom: 13, 
                    scaleControl: false,
                    fullscreenControl: false,

                  }
                }
              >
                {mounted && <Polygon
                  paths={paths}
                  options={
                    {
                      fillColor: "white",
                      fillOpacity: 3,
                      strokeColor: "red",
                      strokeOpacity: 3,
                      strokeWeight: 2,
                      clickable: true,
                      draggable: false,
                      editable: true,
                      geodesic: true,
                      zIndex: 999
                    }
                  }
                />}
                {_markers?.map((marker: MarkerType) => (
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
        
        {/* Info window */}
        <div className={`shadow-xl transition-all ease-in-out duration-300 absolute bg-white w-[500px] ${infoOpen ? 'right-0': 'right-[-1000px]'} z-[11] top-0`}>
          <div className='w-full h-screen sticky top-0 overflow-y-auto'>
            <div>
              <h1>Desa Kamanasa</h1>
            </div>
            {/* <div>
              <Link href='/add-data-disabilities'>
                <a>Data Disabilitas</a>
              </Link>
            </div> */}
            <div className='h-[500px]'>
              <div className='w-full h-full p-[10px]'>
                {activeInfoWindow && 
                
                <table className='border-collapse w-full border border-black'>
                  <tbody>
                    <tr>
                      <td>Nama</td>
                      <td>{activeInfoWindow?.name}</td>
                    </tr>
                    <tr>
                      <td>NIK</td>
                      <td>{activeInfoWindow?.nik}</td>
                    </tr>
                    <tr>
                      <td>Jenis Kelamin</td>
                      <td>{activeInfoWindow?.gender}</td>
                    </tr>
                    <tr>
                      <td>Tanggal Lahir</td>
                      <td>{activeInfoWindow?.birthdate}</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>{activeInfoWindow?.address}</td>
                    </tr>
                    <tr>
                      <td>Disabilitas</td>
                      <td>{activeInfoWindow?.disabilities}</td>
                    </tr>
                  </tbody>
                </table>
                }

                {/* Close info button */}
                <button onClick={()=> setInfoOpen(false)}>Close</button>
              </div>
            </div>
          </div>                  
        </div>
      </div>
    </>
  )
}

export default Home