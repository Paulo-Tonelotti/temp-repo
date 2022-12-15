import { Component } from 'react';

import './style.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  
  // Inicializando o estado do component HOME
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue:'',
  };
  
  
  // Quando o componente monta
  async componentDidMount() {
    await this.loadPosts();
    
  }
  
  // Função que carrega os posts de forma assincrona
  loadPosts = async () => {
    // Usando destructuring para pegar as variaveis do estado
    const { page, postsPerPage } = this.state;
    // A variavel espera receber a resposta de uma função
    const postAndPhotos = await loadPosts();
    // Seta o estado passando a pagina e quantidade de post que tem
    // A variavel posts recebe uma parte que vai ser exibida na tela
    // A all posts recebe todos os posts 
    this.setState({ 
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    })
  }

  // Função que carrega mais posts, que estão na variavel allPosts
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    //     vazio   =  0    +     10
    const nextPage = page + postsPerPage;
    //       vazio  =                  10, 10 + 10
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    // 10, 20 -> vai do post 11 ao 20
    posts.push(...nextPosts);
    // Distribui os posts nesse array

    
    // Seta o estado passando os posts novos e a pagina
    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value})
  }

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : 
    posts;

    return (
      <section className="container">
        <div className="search-container">
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
          )}


          <TextInput searchValue={searchValue}
          handleChange={this.handleChange}/>
        </div>


        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts =( </p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button 
            text="Load more posts" 
            onClick={this.loadMorePosts}
            disabled={noMorePosts}/>
          )}
        </div>
      </section>
    );
  }

}

