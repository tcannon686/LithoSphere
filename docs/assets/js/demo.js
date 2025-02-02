const containerDiv = document.createElement('div')
containerDiv.id = 'lithosphere_container'
document.body.appendChild(containerDiv)

const initialView = {
    lng: 137.370253354311, // default 0
    lat: -4.667975771815966,
    zoom: 16,
}

const Litho = new LithoSphere.default(containerDiv.id, {
    initialView: initialView,
    majorRadius: 3396190,
    loadingScreen: true, // default true
    customParsers: {
        All500: (tilePath, layerObj) => {
            return new Promise((resolve, reject) => {
                const tileDimension = 32
                resolve(new Array(tileDimension * tileDimension).fill(500))
            })
        },
    },
    // opt
    demFallback: {
        demPath:
            './assets/sample_data/Missions/Test/Layers/TilewithDEM/Gale_HiRISE_DEM/{z}/{x}/{y}.png',
        format: 'tms',
        parserType: 'rgba',
    },
    //opt
    tileMapResource: {
        bounds: [0, 0, 0, 0],
        origin: [0, 0],
        proj: null, // proj4 string describing the global tileset projection: string (opt) | default wgs84
        resunitsperpixel: 34,
        reszoomlevel: 0,
    },
    radiusOfTiles: 4, //default 4
    //wireframeMode: true,
    //exaggeration: 1, //default 1
    //showAxes: true,
    useLOD: false, //Level on detail
    renderOnlyWhenOpen: true, // default true
    starsphere: {
        color: '#111111',
    },
    atmosphere: {
        color: '#111111',
    },
    canBecomeHighlighted: true, // default true
    highlightColor: 'yellow', //css color for vector hover highlights | default 'yellow'
    canBecomeActive: true, // default true
    activeColor: 'red', //css color for active vector features | default 'red'
})

console.log(Litho)

Litho.addLayer('tile', {
    name: 'Gale_HiRISE',
    order: 0, //Orders are ordered only within the layer type
    on: true,
    path:
        './assets/sample_data/Missions/Test/Layers/TilewithDEM/Gale_HiRISE/{z}/{x}/{y}.png',
    demPath:
        './assets/sample_data/Missions/Test/Layers/TilewithDEM/Gale_HiRISE_DEM/{z}/{x}/{y}.png',
    //parser: 'All500',
    // TODO: Implement format
    format: 'tms', // 'wmts' || 'wms'
    formatOptions: {},
    demFormat: 'tms', //
    demFormatOptions: {},
    opacity: 1,
    minZoom: 16,
    maxZoom: 17,
    filters: {
        brightness: 1, // default 1
        contrast: 1, // default 1
        saturation: 1, // default 1
        blendCode: 0, //0 = none, 1 = overlay - caveat - tile zooms for all layers should line up,
    },
    boundingBox: [137.365, -4.671, 137.375, -4.662],
})

Litho.addLayer(
    'clamped',
    {
        name: 'Waypoints',
        order: 0,
        on: true,
        // GeoJSON or path to geojson
        geojsonPath:
            './assets/sample_data/Missions/Test/Layers/Waypoints/waypoints.json',
        style: {
            // Prefer feature[f].properties.style values
            letPropertiesStyleOverride: true, // default false
            default: {
                fillColor: '#444444', //Use only rgb and hex. No css color names
                fillOpacity: 1,
                color: 'black',
                weight: 2,
                radius: 'prop=radius',
            },
            point: {
                radius: 8,
            },
            line: {},
            polygon: {},
            byProp: {
                'prop=images.0.test:blue': {},
            },
            bearing: {
                angleProp: 'yaw_rad',
                angleUnit: 'rad',
                color: 'lime',
            },
        },
        opacity: 1,
        minZoom: 16,
        maxZoom: 17,
        //preDrawn?: boolean //override all clamped tiles with pre drawn tiles
        //data?: { {z}: { {x}: { {y}: { pre_drawn_tile_canvas_data } }}} if preDrawn, use these tiles.
    },
    () => {
        //Litho.removeLayer('waypoints')
    }
)

Litho.addLayer(
    'clamped',
    {
        name: 'styledFeatures',
        on: true,
        geojson: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {
                        test: { val: 5 },
                        style: {
                            // Styles can be set per feature like this too
                            color: 'rgb(194, 28, 190)',
                            dashArray: '',
                            fillColor: 'rgb(104, 28, 190)',
                            fillOpacity: 0.2,
                            opacity: 1,
                            radius: 2,
                            symbol: '',
                        },
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [137.37228, -4.66444],
                                [137.37263, -4.66482],
                                [137.37227, -4.66515],
                                [137.37192, -4.66466],
                                [137.37228, -4.66444],
                            ],
                        ],
                    },
                },
            ],
        },
        onClick: function (feature, lnglat, layer) {
            alert(`Clicked ${layer.name}`)
            console.log(feature, lnglat, layer)
        },
        useKeyAsHoverName: 'test.val', // string (dot-notated) of key path in feature properties to show on hover
        opacity: 1,
        minZoom: 0,
        maxZoom: 30,
        style: {
            // Prefer feature[f].properties.style values
            letPropertiesStyleOverride: true,
        },
    },
    () => {
        //console.log('loaded')
        setTimeout(() => {
            //console.log('removing')
            //Litho.removeLayer('styledFeatures')
        }, 10000)
    }
)

Litho.addLayer('vector', {
    name: 'vectorLine',
    order: 1,
    on: true,
    // GeoJSON or path to geojson
    // [lng, lat, elev?]
    geojson: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: { SOL: 0, Site: 0, length: 25.99 },
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [137.368729, -4.6643, -4410],
                        [137.36849, -4.66646, -4430],
                    ],
                },
            },
        ],
    },
    //swapLL: false //swap the default long lat order to lat long
    useKeyAsHoverName: 'length',
    style: {
        // Prefer feature[f].properties.style values
        letPropertiesStyleOverride: false, // default false
        default: {
            fillColor: 'cyan', //Use only rgb and hex. No css color names
            fillOpacity: 1,
            color: 'white', //Not relevant for lines because fillColor is the primary color
            weight: 6,
            radius: 'prop=radius',
        },
        point: {},
        line: {},
        lineType: 'thick', // 'thin' || '<any_else_for_default>/thick' //note: only thick lines can be raytraced
        polygon: {},
        byProp: {
            'prop=images.0.test:blue': {},
        },
    },
    opacity: 1,
    minZoom: 11,
    maxZoom: 18,
})
//Litho.removeLayer('vectorLine')

Litho.addLayer('vector', {
    name: 'vectorPoints',
    order: 2,
    on: true,
    // GeoJSON or path to geojson
    // [lng, lat, elev?]
    geojson: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: { time: { SOL: 0 }, site_pos: [3, 0] },
                geometry: {
                    type: 'Point',
                    coordinates: [137.372897, -4.66528, -4455],
                },
            },
            {
                type: 'Feature',
                properties: {
                    time: { SOL: 1 },
                    site_pos: [4, 162],
                },
                geometry: {
                    type: 'Point',
                    coordinates: [137.372297, -4.66598, -4455],
                },
            },
        ],
    },
    onClick: function (feature, lnglat, layer) {
        console.log(feature, lnglat, layer)
    },
    useKeyAsHoverName: 'site_pos.0',
    //swapLL: false //swap the default long lat order to lat long
    style: {
        // Prefer feature[f].properties.style values
        letPropertiesStyleOverride: true, // default false
        default: {
            fillColor: 'green', //Use only rgb and hex. No css color names
            fillOpacity: 1,
            color: 'white',
            weight: 2,
            radius: 'prop=radius',
        },
        point: {
            radius: 8,
        },
        line: {},
        lineType: 'thick', // 'thick' || '<any_else_for_default>'
        polygon: {},
        byProp: {
            'prop=time.SOL:1': {
                fillColor: 'lime',
            },
        },
    },
    opacity: 1,
    minZoom: 11,
    maxZoom: 18,
})
//Litho.removeLayer('vectorPoint')

// "Curtains" are vertical 2D images draped from a line
Litho.addLayer(
    'curtain',
    {
        name: 'Radargram',
        on: true,
        opacity: 0.7,
        imagePath:
            './assets/sample_data/Missions/Test/Data/radargrams/radargram_test.jpg',
        //imageColor: ['cyan', 'rgba(0,0,0,0)', '#FF0000'], //Alternatively provide a solid color (or an array for a vertical gradient)
        // depth of image in meters
        depth: 14,
        // length of image in meters
        length: 62.35,
        options: {
            // optional
            verticalExaggeration: 1, // default 1x
            verticalOffset: 0, // default 0
        },
        // GeoJSON feature geometry that corresponds to the top of the curtain/image
        lineGeometry: {
            type: 'LineString',
            coordinates: [
                [137.368229, -4.6659, -4453],
                [137.369829, -4.665, -4444],
                [137.36869, -4.66636, -4444],
                [137.36959, -4.6666, -4437],
            ],
        },
        onMouseMove: function (
            e,
            layer,
            mesh,
            intersection,
            intersectedLngLat,
            intersectionXYZ
        ) {
            // intersection.uv gives mouse's texture coords
            // console.log(intersection.uv)
        },
    },
    () => {
        /*
                    console.log('Curtain loaded')
                    let exag = 1
                    setInterval(() => {
                        exag += 0.01
                        Litho.setLayerSpecificOptions('Radargram', {
                            verticalExaggeration: exag,
                            //verticalOffset: exag,
                        })
                    }, 100)
                    */
    }
)

Litho.addLayer(
    'model',
    {
        name: 'roverGLTF',
        order: 1,
        on: true,
        path: './assets/sample_data/Missions/Test/Data/models/Perseverance.glb',
        opacity: 1,
        isArrayed: false, // default false // if true, position, scale and rotation are arrays for a series of models
        position: {
            longitude: 137.371297, // default 0
            latitude: -4.66698, // default 0
            elevation: -4455.585, // default 0
        },
        scale: 5, // default 1
        rotation: {
            // y-up is away from planet center. x is pitch, y is yaw, z is roll
            x: -0.1, // in radians | default 0
            y: Math.PI / 2, // default 0
            z: 0, // default 0
            order: 'YXZ', //default YXZ
        },
        cache: false, // default true // If true, uses cloned meshes from the first download
    },
    () => {
        console.log('Rover loaded')
        //Litho.setLayerOpacity('roverGLTF', 0.25)
        //Litho.removeLayer('roverGLTF')

        //Litho.toggleLayer('roverGLTF', false)
        //setTimeout(() => {
        //    Litho.toggleLayer('roverGLTF', true)
        //}, 10000)
    }
)

Litho.addControl('myHome', Litho.controls.home)
Litho.addControl('myExaggerate', Litho.controls.exaggerate)
Litho.addControl('myLayers', Litho.controls.layers)
Litho.addControl('myObserve', Litho.controls.observe)
Litho.addControl('myWalk', Litho.controls.walk)
Litho.addControl('myCompass', Litho.controls.compass)
Litho.addControl('myCoords', Litho.controls.coordinates, {
    //existingDivId: 'myCustomCoordDiv',
})
const myLink = Litho.addControl('myLink', Litho.controls.link, {
    initiallyLinked: true,
    // callbacks
    onMove: (lng, lat, height) => {
        /*React to globe move*/
        //L_.Map_.resetView([lat, lng], true)
    },
    onMouseMove: (lng, lat, height) => {
        //L_.Map_.setPlayerLookat(lng, lat)
    },
    onMouseOut: () => {
        //L_.Map_.hidePlayer()
    },
    onToggle: (isLinked) => {},
    onFirstPersonUpdate: () => {
        /*
                    const playerll = Litho.getCenter()
                    L_.Map_.setPlayerArrow(
                        playerll.lon,
                        playerll.lat,
                        (Litho.cameras.firstPerson.controls.getObject().rotation.y % (Math.PI * 2)) +
                            Math.PI
                    )
                    L_.Map_.setPlayerLookat(Globe_.mouseLngLat.Lng, Globe_.mouseLngLat.Lat)
                    */
    },
    onOrbitalUpdate: () => {
        //L_.Map_.hidePlayer()
    },
})
/*
            Map_.map.on('move', (e) => {
                const c = Map_.map.getCenter()
                myLink.linkMove(c.lng, c.lat)
            })
            Map_.map.on('mousemove', (e) => {
                myLink.linkMouseMove(e.latlng.lng, e.latlng.lat)
            })
            Map_.map.on('mouseout', (e) => {
                myLink.linkMouseOut()
            })
            */
