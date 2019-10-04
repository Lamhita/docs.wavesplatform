import {
    Select,
    Button,
    Popover,
    Breadcrumb,
    BreadcrumbItem,
    Alert,
    Card,
    Divider,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default async(context) => {
    const { Vue } = context;

    [
        Select,
        Button,
        Popover,
        Breadcrumb,
        BreadcrumbItem,
        Alert,
        Card,
        Divider,
        Checkbox,
        CheckboxButton,
        CheckboxGroup,
    ].forEach(component => {
        Vue.component(component.name, component)
    });

}
