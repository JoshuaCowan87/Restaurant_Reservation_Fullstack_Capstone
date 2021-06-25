function FormError ({formErrors}) {
    let id = 0
    const formErrorList = formErrors.map(error => {
        id++;
        return (
        <div className="alert alert-danger m-2" key={id}>Error: {error}</div>
            
        )
    })
    
        if (formErrors.length > 0) {
            return (
                <div>
                    {formErrorList}
                       
                </div>
            )
        }
        return null
        
    }
    
    
    export default FormError;