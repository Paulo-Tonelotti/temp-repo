import './Teste.css';
import { Component } from 'react';

class Teste extends Component {
    state = {
        quotes: []
    };

    componentDidMount(){
        this.loadQuote();
    }

    loadQuote = async () => {
        const quoteResponse = fetch('https://api.kanye.rest')
        const [ quote ] = await Promise.all([ quoteResponse ])

        const quoteJson = await quote.json();
        console.log(quoteJson)
        this.setState({ quotes: quoteJson})

    }

    render() {
        const { quotes } = this.state;
        return(
            <div className="postBox">
                <p className="quote">"{quotes.quote}" - Kanye West</p>
                <button onClick={this.loadQuote}>new quote</button>
            </div>

        ); 
    }
}

export default Teste;