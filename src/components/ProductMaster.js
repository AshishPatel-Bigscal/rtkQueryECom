import "./productMaster.css";
import { useGetProductsQuery } from "../services/productsAPI";
import { useFormik } from "formik";

const ProductMaster = () => {

    const { data } = useGetProductsQuery();
    const { values, handleChange, } = useFormik({
        initialValues: {
            id: "",
            image: "",
            type: "",
            brand: "",
            model: "",
            price: ""
        }
    })
    return (
        <div className="prodMasterContainer">
            <div className="adminHeader">
                ProductMaster
            </div>
            <div className="adminProductEntry">
                <div>
                    <input type='text' id="prodType" name='prodType'
                        placeholder="product type" onChange={handleChange}
                        value={values.prodType} />
                    <input type='text' name='prodBrand'
                        placeholder="product brand" onChange={handleChange}
                        value={values.prodBrand} />
                </div>
                <div>
                    <input type='text' name='prodModel'
                        placeholder="product model" onChange={handleChange}
                        value={values.prodModel} />
                    <input type='text' name='prodPrice'
                        placeholder="product price" onChange={handleChange}
                        value={values.prodPrice} />
                </div>
                <div>
                    <input type='text' name='prodImage' />
                    <input type="file" />
                </div>
            </div>
            <div className="adminProductList">
                {
                    data && data.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <span>id : {item.id}</span>
                                <span>image : {item.image}</span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default ProductMaster