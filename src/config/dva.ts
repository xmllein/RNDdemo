import {create} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@/models/index';
// 创建实例
const app = create();
// 加载model
models.forEach(model => app.model(model));
app.use(createLoading());
// 启动dva
app.start();

// 导出dva实例
export default app._store;
