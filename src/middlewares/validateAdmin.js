export const validateAdmin = (req, res, next) => {
    const { isAdmin } = req.body;

    if (!isAdmin) {
        return res.json({
            'error': -1,
            'descripcion': 'No cuenta con los permisos necesarios para realizar esta acción'
        })
    }

    next()
}