import styled from 'styled-components'

const Wrapper = styled.main`
  header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--primary-500);

    h1 {
      color: var(--white);
    }
    button {
      background-color: var(--white);
      padding: 0.7rem;
      border-radius: 10px;
      color: var(--primary-500);
      border: none;
      cursor: pointer;
    }
    button:hover {
      color: var(--primary-900);
      background-color: var(--backgroundColor);
    }
  }


  @media (max-width: 580px) {
    width: 580px;
  }
`

export default Wrapper
