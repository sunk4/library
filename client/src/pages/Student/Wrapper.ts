import styled from 'styled-components'


const Wrapper = styled.section`
  padding-left: 2rem;
  margin-top: 2rem;
  .header {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  button {
    padding: 0.7rem;
    border-radius: 10px;
    background-color: var(--primary-500);
    color: var(--white);
    border: none;
    cursor: pointer;
  }
  .section-borrowed-books {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap:1rem;
    div{
      background-color: var(--white);
      border-radius: 10px;
    }
  }
  @media (max-width: 580px) {
    .section-borrowed-books {
    
      grid-template-columns: 1fr
    }
  }
`
export default Wrapper
