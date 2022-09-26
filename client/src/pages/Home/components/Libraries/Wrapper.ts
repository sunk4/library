import styled from 'styled-components'

const Wrapper = styled.section`
  max-width: 50%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
  .library-section {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border-radius: 10px;
    padding: 1rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        color: var(--primary-500);
      }
      button {
        background-color: var(--red-light);
        padding: 0.5rem;
        border-radius: 5px;
        color: var(--white);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background-color: var(--red-dark);
      }
    }
    p {
      font-size: 1.1rem;
    }

    a {
      color: inherit;
      text-decoration: inherit;   
      text-align:center;
      button {
        background-color: var(--primary-500);
        padding: 0.5rem;
        border-radius: 5px;
        color: var(--white);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background-color: var(--primary-600);
      }
    }
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

export default Wrapper
