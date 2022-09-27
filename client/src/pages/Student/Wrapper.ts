import styled from 'styled-components'


const Wrapper = styled.section`
  padding-left: 2rem;
  margin-top: 2rem;
  .header{
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
  }
`
export default Wrapper
