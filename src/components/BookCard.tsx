import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import fallbackImage from "../assets/fallbackImage.jpg";

function BookCard({
  item,
  key,
  cover_id,
}: {
  item: any;
  key: number;
  cover_id: string;
}) {
  const navigate = useNavigate();
  const [, , id] = item.key.split("/");

  const handleBookDetailsClick = () => {
    navigate(`book/${id}`);
  };

  return (
    <Card style={{ width: "18rem" }} className="shadow d-flex ">
      {cover_id ? (
        <Card.Img
          height={400}
          variant="top"
          src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`}
        />
      ) : (
        <Card.Img
          height={400}
          variant="top"
          src={fallbackImage}
          alt="Fallback Image"
        />
      )}
      <Card.Body className="bg-primary-subtle">
        <Card.Title>{item.title}</Card.Title>
        <Button variant="warning" onClick={handleBookDetailsClick}>
          Book Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
