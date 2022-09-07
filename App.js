const sounds = [
    {
        key: "Q",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        key: "W",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        key: "E",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    },
    {
        key: "A",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        key: "S",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        key: "D",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        key: "Z",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        key: "X",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        key: "C",
        mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }

]

const App = () => {
    return (
        <div id="drum-machine" className="container" >
            <div id="display" className="display">
                <h2>Play a sound</h2>
                {sounds.map((sound, idx) => (
                    // the sounds array is looped over and the values of the keys are returned in the class component 'Box'
                    <DrumPad text={sound.key} key={idx} audio={sound.mp3} />
                ))}
            </div>
        </div >
    )
}

class DrumPad extends React.Component {
    constructor(props) {
        super(props)

        this.audio = React.createRef();
    }

    // function for the 'Box' to target the buttons 
    playSound = () => {
        this.audio.current.play()
        const parent = this.audio.current.parentNode
        parent.classList.add('active')

        // stop the audio immediately after playing
        this.audio.current.currentTime = 0

        // targeting the parent element of 'drum-pad' which is 'display' 
        const display = parent.parentNode
        // selecting the unique 'id' of each
        const id = this.audio.current.id
        display.querySelector('h2').innerText = `${id} is playing`
    }

    // checks for any event listener on the audio keys
    componentDidMount() {
        this.audio.current.addEventListener('ended', (e) => {
            const parent = e.target.parentNode
            parent.classList.remove('active')

            // targeting the parent element of 'drum-pad' which is 'display' 
            const display = parent.parentNode
            // selecting the unique 'id' of each
            const id = this.audio.current.id
            display.querySelector('h2').innerText = `Play a sound`
        })
    }

    render() {
        // creating a state inside the functional component
        const { text, audio } = this.props

        return (
            <div
                className="drum-pad"
                id={`drum-${text}`}
                onClick={this.playSound}
            >
                {text}
                <audio ref={this.audio} src={audio} className="clip" id={text} />
            </div>
        )
    }
}

// using buttons to play sounds
document.addEventListener('keydown', (e) => {
    // the key pressed set to 'id'
    const id = e.key.toUpperCase()

    // the 'id' used to get to element
    const audio = document.getElementById(id)

    if (audio) {
        const parent = audio.parentNode
        parent.classList.add('active')
        audio.play()

        // stop the audio immediately after playing
        audio.currentTime = 0

        // targeting the parent element of 'drum-pad' which is 'display' 
        const display = parent.parentNode
        display.querySelector('h2').innerText = `${id} is playing`
    }
})

ReactDOM.render(
    <App />, document.getElementById('app')
)