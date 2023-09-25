import { useEffect, useState } from "react";
import { useGetBooks } from "../services/useGetBooks";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import { Button, Image } from "react-bootstrap";
import fallbackImage from "../assets/fallbackImage.jpg";

export default function BookDetail() {
  const { bookDetail } = useGetBooks();
  const [loader, setLoader] = useState(false);
  const [detail, setDetail] = useState<any>();
  const { id } = useParams();
  const navigate = useNavigate();

  const bookInfo = async () => {
    try {
      setLoader(true);
      const res = await bookDetail(id);
      if (res) {
        setDetail(res);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    bookInfo();
  }, []);
  return !loader ? (
    <div className="d-flex justify-content-center my-4 gap-2 mx-5 align-items-center flex-column">
      {detail && (
        <>
          <Carousel className=" shadow-lg ">
            {detail.covers &&
              detail.covers.map((item: string) => {
                return (
                  <Carousel.Item interval={1000}>
                    <Image
                      height={400}
                      src={`https://covers.openlibrary.org/b/id/${item}-M.jpg`}
                      alt="Fallback Image"
                    />
                  </Carousel.Item>
                );
              })}
          </Carousel>
          <div>
            <h2>{detail.title}</h2>
            <Table striped bordered hover className="border-0 shadow-lg ">
              <tbody>
                <tr>
                  <th>Title</th>
                  <td>{detail.title}</td>
                </tr>
                <tr>
                  <th>Created</th>
                  <td>{detail.created.value}</td>
                </tr>
                <tr>
                  <th>Last Modified</th>
                  <td>{detail.last_modified.value}</td>
                </tr>
                <tr>
                  <th>Key</th>
                  <td>{detail.key}</td>
                </tr>
                <tr>
                  <th>Authors</th>
                  <td>
                    {detail.authors.map((author: any, index: number) => (
                      <span key={index}>
                        <a href={author.author.key}>{author.author.key}</a>
                        {index < detail.authors.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{detail.type.key}</td>
                </tr>
                <tr>
                  <th>Revision</th>
                  <td>{detail.revision}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Button variant="warning" onClick={()=>navigate(`/`)}>GO BACK</Button>
        </>
      )}
    </div>
  ) : (
    <div className="spinnerContainer">
      <Spinner animation="grow" variant="danger" />
    </div>
  );
}
