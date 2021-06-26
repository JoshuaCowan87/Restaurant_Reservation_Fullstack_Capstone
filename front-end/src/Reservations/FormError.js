function FormError ({formErrors}) {
    let id = 0

    if (formErrors.length === 0) {
        return null
    }

    const formErrorList = formErrors.map(error => {
        id++;
        return (
        <div className="alert alert-danger" key={id}>Error: {error}</div>
            
        )
    })
    
        if (formErrors.length > 0) {
            return (
                <div>
                    {formErrorList}
                       
                </div>
            )
        }
       
    }
    
    
    export default FormError;