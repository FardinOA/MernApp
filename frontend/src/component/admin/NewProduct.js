import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newProduct } from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstants";

const categories = [
    "laptop",
    "Computer",
    "Tops",
    "Smartphone",
    "T-Shirt",
    "Pant",
    "Shirt",
    "TV",
    "Sports",
];
const NewProduct = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, success } = useSelector(
        (state) => state.newProduct
    );
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Product Created Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, alert, history, success]);

    const createProductSubminHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        images.forEach((image) => {
            myForm.append("images", image);
        });
        // let imagesData = [];
        // images.forEach((image) => {
        //     imagesData.push(image);
        // });

        // const myData = {
        //     name,
        //     price,
        //     description,
        //     category,
        //     stock,
        //     images: imagesData,
        // };

        dispatch(newProduct(myForm));
    };

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="New Product" />
            <div className="dashboard">
                <Sidebar />

                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubminHandler}
                    >
                        <h1>Create Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea
                                type="number"
                                placeholder="Product Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>

                                {categories.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                multiple
                                onChange={createProductImageChange}
                            />
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, ind) => (
                                <img
                                    key={ind}
                                    src={image}
                                    alt="Product Preview"
                                />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
