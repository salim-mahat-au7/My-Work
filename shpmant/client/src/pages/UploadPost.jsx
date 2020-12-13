import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { userUploadPost } from '../redux/actions/userAction'
import Navbar from '../components/Navbar'

const UploadPost = () => {
    const store = useSelector(store => store)
    const errorRoot = useSelector(store => store.errorRoot)
    const history = useHistory()
    const dispatch = useDispatch()
    const [imgUrl, setImgUrl] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const imageHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImgUrl(img)
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("imgUrl", imgUrl)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("email", store.userRoot.user.email)
        dispatch(userUploadPost(formData, history,store.userRoot.user._id))
        setIsLoading(true)
    }
    
    useEffect(() => {
        if (errorRoot.uploadPostErrors) {
            setErrors(errorRoot.uploadPostErrors)
        }
    }, [errorRoot.uploadPostErrors])

    useEffect(() => {
        if (errorRoot.uploadPostErrors || store.postLoaderFlag) {
            setIsLoading(false)
        }

    }, [errorRoot.registerErrors, store.registerLoaderFlag])
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <form onSubmit={formSubmitHandler}>
                            <div className="form-group">
                                <label htmlFor="inputId">Profile Picture</label>
                                <input type="file" accept=".jpg,.png,.jpeg" id="inputId" required onChange={imageHandler} className={classnames("form-control",
                                    {
                                        'is-invalid': errors.imgUrl

                                    })}  />
                                {errors.imgUrl && (<div className="invalid-feedback">{errors.imgUrl}</div>)} 
                            </div>
                            <div className="form-group">
                                <label htmlFor="titleId">Title</label>
                                <input onChange={(e) => setTitle(e.target.value)} required value={title}  type="text"  id="titleId" className={classnames("form-control",
                                    {
                                        'is-invalid': errors.title

                                    })} />
                                {errors.title && (<div className="invalid-feedback">{errors.title}</div>)} 
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} required class="form-control" id="exampleFormControlTextarea1" rows="3" className={classnames("form-control",
                                    {
                                        'is-invalid': errors.description

                                    })}  />
                                {errors.description && (<div className="invalid-feedback">{errors.description}</div>)} 
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-md-1">
                                    {
                                        isLoading && <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {!isLoading && <button type="submit" className="btn btn-info">Upload</button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
        
       
    )
}

export default UploadPost
