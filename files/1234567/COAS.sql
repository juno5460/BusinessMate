/*
 Navicat Premium Data Transfer

 Source Server         : coasconn
 Source Server Type    : Oracle
 Source Server Version : 112010
 Source Host           : 10.108.1.213
 Source Schema         : COAS

 Target Server Type    : Oracle
 Target Server Version : 112010
 File Encoding         : utf-8

 Date: 11/26/2012 14:35:13 PM
*/

-- ----------------------------
--  Table structure for "AC_MENU"
-- ----------------------------
DROP TABLE "AC_MENU";
CREATE TABLE "AC_MENU" (   "IDS" NUMBER(19,0) NOT NULL, "CREATEDDATE" DATE, "MODIFIEDDATE" DATE, "VALID" CHAR(1BYTE), "NAMES" VARCHAR2(25BYTE), "URL" VARCHAR2(100BYTE), "CREATORUSERIDS" NUMBER(19,0), "CREATORUSERNAME" VARCHAR2(128BYTE), "MODIFIEDUSERIDS" NUMBER(19,0), "MODIFIEDUSERNAME" VARCHAR2(128BYTE), "PARENTMENUIDS" NUMBER(19,0), "DESCRIPTION" VARCHAR2(200BYTE), "MENUTYPE" VARCHAR2(50BYTE), "MENULEVEL" NUMBER(19,0), "ORDERIDS" NUMBER(19,0), "OPERATORIDS" NUMBER(19,0), "IMAGES" VARCHAR2(50BYTE));

-- ----------------------------
--  Records of "AC_MENU"
-- ----------------------------
INSERT INTO "AC_MENU" VALUES ('122', null, TO_DATE('2012-10-18 14:41:36','YYYY-MM-DD HH24:MI:SS'), '1', '航空公司列表', 'departmentAction!toDepartmentListJsp.action', null, null, '41', 'system', '66', '航空公司列表', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('108', null, TO_DATE('2012-11-02 11:52:09','YYYY-MM-DD HH24:MI:SS'), '1', '关注航线分析', 'attentionLineAnalyseAction!toAnalyseJSP.action', null, null, '44', 'super', '104', '关注航线分析', null, null, '4', null, null);
INSERT INTO "AC_MENU" VALUES ('117', null, TO_DATE('2012-10-18 15:20:29','YYYY-MM-DD HH24:MI:SS'), '1', '系统监控', '#', null, null, '41', 'system', '116', '系统监控', null, null, '5', null, null);
INSERT INTO "AC_MENU" VALUES ('83', null, TO_DATE('2011-06-15 16:51:07','YYYY-MM-DD HH24:MI:SS'), '1', '项目通讯录', 'commAction!toProInfoTree.action?actionFlag=commPeople', null, null, '1', 'liangxh', '13', '项目通讯录', null, null, '10', null, null);
INSERT INTO "AC_MENU" VALUES ('78', null, TO_DATE('2011-06-13 09:42:44','YYYY-MM-DD HH24:MI:SS'), '1', '模板管理', 'admin/processDefinitionAction!toProcessDefinitionListJsp.action  ', null, null, '1', 'liangxh', '64', '模板管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('60', null, TO_DATE('2012-10-09 01:12:49','YYYY-MM-DD HH24:MI:SS'), '1', '项目实施阶段管理', 'admin/commAction!toPlanTypeTree.action?actionFlag=visvualPlanRefere', null, null, '40', 'denghaier', '44', '项目实施阶段管理', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('59', null, TO_DATE('2012-10-10 09:23:05','YYYY-MM-DD HH24:MI:SS'), '1', '渠道分析', 'channelAnalyseAction!toChannelAnalyseJSP.action', null, null, '1', 'liangxh', '44', '外委单位管理', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('1', null, TO_DATE('2012-10-09 00:22:57','YYYY-MM-DD HH24:MI:SS'), '1', '运价查询', '#', null, null, '40', 'denghaier', null, '运价查询', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('2', null, TO_DATE('2012-10-09 00:30:30','YYYY-MM-DD HH24:MI:SS'), '1', '项目管理', '#', null, null, '40', 'denghaier', null, '项目管理', null, null, '11', null, null);
INSERT INTO "AC_MENU" VALUES ('121', null, TO_DATE('2012-11-02 11:51:28','YYYY-MM-DD HH24:MI:SS'), '1', '竞争分析', 'competeAnalyseAction!toAnalyseJSP.action', null, null, '44', 'super', '104', '竞争分析', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('19', null, TO_DATE('2011-04-25 10:13:50','YYYY-MM-DD HH24:MI:SS'), '1', '文档管理', 'commAction!toProInfoTree.action?actionFlag=file', null, null, '1', 'liangxh', '13', '文档管理', null, null, '7', null, null);
INSERT INTO "AC_MENU" VALUES ('24', null, TO_DATE('2012-09-27 15:49:01','YYYY-MM-DD HH24:MI:SS'), '1', '预警设置', 'alertSettingAction!toAlertSettingJsp.action', null, null, '1', 'liangxh', '23', '预警设置', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('29', null, TO_DATE('2011-05-07 15:32:32','YYYY-MM-DD HH24:MI:SS'), '1', '文档统计', 'commAction!toProInfoTree.action?actionFlag=count', null, null, '1', 'liangxh', '23', '文档统计', null, null, '6', null, null);
INSERT INTO "AC_MENU" VALUES ('36', null, TO_DATE('2011-04-21 13:34:48','YYYY-MM-DD HH24:MI:SS'), '1', '用户管理', 'admin/userAction!toUserListJsp.action', null, null, null, null, '65', '用户管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('49', null, TO_DATE('2011-04-21 13:34:31','YYYY-MM-DD HH24:MI:SS'), '1', '分派管理', 'admin/assignModeAction!toassignModeListsp.action', null, null, null, null, '64', '分派管理', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('13', TO_DATE('2011-03-26 11:24:17','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2011-03-26 11:24:17','YYYY-MM-DD HH24:MI:SS'), '1', '项目控制', '#', null, null, null, null, '2', '项目控制', null, null, '4', null, null);
INSERT INTO "AC_MENU" VALUES ('18', null, TO_DATE('2011-04-23 09:55:34','YYYY-MM-DD HH24:MI:SS'), '1', '问题管理', 'tbProQuestionAction!toTbProQuestionListJsp.action', null, null, '1', 'liangxh', '13', '风险管理', null, null, '5', null, null);
INSERT INTO "AC_MENU" VALUES ('23', TO_DATE('2011-03-26 11:28:20','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2011-03-26 11:28:20','YYYY-MM-DD HH24:MI:SS'), '1', '统计报表', '#', null, null, null, null, '2', '统计报表', null, null, '5', null, null);
INSERT INTO "AC_MENU" VALUES ('32', null, TO_DATE('2012-10-09 00:30:37','YYYY-MM-DD HH24:MI:SS'), '1', '组织机构管理', '#', null, null, '40', 'denghaier', null, '组织机构管理', null, null, '12', null, null);
INSERT INTO "AC_MENU" VALUES ('66', TO_DATE('2011-04-22 23:55:17','YYYY-MM-DD HH24:MI:SS'), null, '1', '其他管理', '#', null, null, null, null, '44', '其他管理', null, null, null, null, null);
INSERT INTO "AC_MENU" VALUES ('52', TO_DATE('2011-03-30 08:44:08','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2011-03-30 08:44:08','YYYY-MM-DD HH24:MI:SS'), '1', '办结任务', '#', null, null, null, null, '67', '办结任务', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('51', TO_DATE('2011-03-30 08:43:45','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2011-03-30 08:43:45','YYYY-MM-DD HH24:MI:SS'), '1', '已办任务', '#', null, null, null, null, '67', '已办任务', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('27', null, TO_DATE('2011-05-23 16:19:07','YYYY-MM-DD HH24:MI:SS'), '1', '项目月报', 'reportMonthAction!queryProjectPlanReport.action', null, null, '1', 'liangxh', '23', '项目月报', null, null, '4', null, null);
INSERT INTO "AC_MENU" VALUES ('34', null, TO_DATE('2012-10-09 00:31:21','YYYY-MM-DD HH24:MI:SS'), '1', '任务管理', '#', null, null, '40', 'denghaier', null, '任务管理', null, null, '13', null, null);
INSERT INTO "AC_MENU" VALUES ('33', null, TO_DATE('2012-10-09 00:57:11','YYYY-MM-DD HH24:MI:SS'), '1', '权限管理', '#', null, null, '1', 'liangxh', null, '权限管理', null, null, '5', null, null);
INSERT INTO "AC_MENU" VALUES ('38', null, TO_DATE('2011-04-21 13:35:00','YYYY-MM-DD HH24:MI:SS'), '1', '部门管理', 'admin/departmentAction!toDepartmentListJsp.action', null, null, null, null, '65', '部门管理', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('47', null, TO_DATE('2012-10-09 20:43:45','YYYY-MM-DD HH24:MI:SS'), '1', '字典项管理', 'dictManagerAction!toDictListJsp.action', null, null, '41', 'system', '66', '字典项管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('46', null, TO_DATE('2012-10-09 00:30:45','YYYY-MM-DD HH24:MI:SS'), '1', '流程管理', '#', null, null, '40', 'denghaier', null, '流程管理', null, null, '13', null, null);
INSERT INTO "AC_MENU" VALUES ('50', null, TO_DATE('2011-05-24 14:18:43','YYYY-MM-DD HH24:MI:SS'), '1', '待办任务', 'taskManagerAction!toTaskListJsp.action', null, null, '1', 'liangxh', '67', '代办任务', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('9', TO_DATE('2011-03-26 11:22:53','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2011-03-26 11:22:53','YYYY-MM-DD HH24:MI:SS'), '1', '项目实施', '#', null, null, null, null, '2', '项目实施', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('20', null, TO_DATE('2011-05-05 10:07:42','YYYY-MM-DD HH24:MI:SS'), '1', '质量控制', 'commAction!toProInfoTree.action?actionFlag=qual', null, null, '1', 'liangxh', '13', '质量控制', null, null, '7', null, null);
INSERT INTO "AC_MENU" VALUES ('21', null, TO_DATE('2011-05-11 10:46:01','YYYY-MM-DD HH24:MI:SS'), '1', '沟通管理', 'tbCommunicationAction!toTbCommunicationListJsp.action', null, null, '1', 'liangxh', '13', '沟通管理', null, null, '8', null, null);
INSERT INTO "AC_MENU" VALUES ('25', null, TO_DATE('2012-09-27 15:55:07','YYYY-MM-DD HH24:MI:SS'), '1', '运价查询', 'fareAction!toFareList.action', null, null, '1', 'liangxh', '23', '运价查询', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('26', null, TO_DATE('2012-09-27 15:55:37','YYYY-MM-DD HH24:MI:SS'), '1', '关注航线设置', 'focusLineAction!toListFocusLine.action', null, null, '1', 'liangxh', '23', '关注航线设置', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('30', TO_DATE('2011-03-26 11:31:22','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2011-03-26 11:31:22','YYYY-MM-DD HH24:MI:SS'), '1', '项目结项', '#', null, null, null, null, '2', '项目结项', null, null, '6', null, null);
INSERT INTO "AC_MENU" VALUES ('31', null, TO_DATE('2011-06-01 15:52:56','YYYY-MM-DD HH24:MI:SS'), '1', '项目完结', 'tbProjectInfoFinishAction!toTbProjectFinishTreeJsp.action', null, null, '1', 'liangxh', '30', '项目完结', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('64', TO_DATE('2011-04-22 23:54:33','YYYY-MM-DD HH24:MI:SS'), null, '1', '流程管理', '#', null, null, null, null, '46', '流程管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('42', null, TO_DATE('2011-04-27 11:33:07','YYYY-MM-DD HH24:MI:SS'), '1', '菜单管理', 'admin/menuAction!toMenuListJsp.action', null, null, '1', 'liangxh', '63', '菜单管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('44', null, TO_DATE('2012-10-09 00:56:56','YYYY-MM-DD HH24:MI:SS'), '1', '其他管理', '#', null, null, '1', 'liangxh', null, '其他管理', null, null, '6', null, null);
INSERT INTO "AC_MENU" VALUES ('67', TO_DATE('2011-04-22 23:55:50','YYYY-MM-DD HH24:MI:SS'), null, '1', '任务管理', '#', null, null, null, null, '34', '任务管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('70', null, TO_DATE('2011-04-23 10:02:53','YYYY-MM-DD HH24:MI:SS'), '1', '风险管理', 'tbProRiskAction!toTbProRiskListJsp.action', null, null, '1', 'liangxh', '13', '风险管理', null, null, '6', null, null);
INSERT INTO "AC_MENU" VALUES ('63', TO_DATE('2011-04-22 23:54:12','YYYY-MM-DD HH24:MI:SS'), null, '1', '权限管理', '#', null, null, null, null, '33', '权限管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('65', TO_DATE('2011-04-22 23:54:55','YYYY-MM-DD HH24:MI:SS'), null, '1', '组织机构管理', '#', null, null, null, null, '32', '组织机构管理', null, null, null, null, null);
INSERT INTO "AC_MENU" VALUES ('72', null, TO_DATE('2012-09-27 15:55:59','YYYY-MM-DD HH24:MI:SS'), '1', '航线设置', 'frequencyAction!toListFrequencySetting.action', null, null, '1', 'liangxh', '23', '航线设置', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('71', null, TO_DATE('2011-06-15 16:48:50','YYYY-MM-DD HH24:MI:SS'), '1', '通知管理', 'tbCommunicationAction!toNotifyListJsp.action', null, null, '1', 'liangxh', '13', '通知管理', null, null, '11', null, null);
INSERT INTO "AC_MENU" VALUES ('107', TO_DATE('2012-10-09 00:36:59','YYYY-MM-DD HH24:MI:SS'), null, '1', '渠道分析', 'channelAnalyseAction!toChannelAnalyseJSP.action', '40', 'denghaier', null, null, '104', '渠道分析', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('109', TO_DATE('2012-10-09 00:52:08','YYYY-MM-DD HH24:MI:SS'), null, '1', '用户管理', 'admin/userAction!toUserListJsp.action', '1', 'liangxh', null, null, '63', '用户管理', null, null, '4', null, null);
INSERT INTO "AC_MENU" VALUES ('113', TO_DATE('2012-10-09 00:58:45','YYYY-MM-DD HH24:MI:SS'), null, '1', '抓取管理', '#', '1', 'liangxh', null, null, '112', '抓取管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('114', TO_DATE('2012-10-09 01:01:04','YYYY-MM-DD HH24:MI:SS'), null, '1', '抓取航空设置', 'taskInfoAction!addTaskInfo.action', '40', 'denghaier', null, null, '113', '抓取航空设置', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('115', null, TO_DATE('2012-10-09 22:23:57','YYYY-MM-DD HH24:MI:SS'), '1', '抓取网站设置', 'taskInfoAction!toSourceLink.action', null, null, '41', 'system', '113', '抓取网站设置', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('116', TO_DATE('2012-10-09 01:02:59','YYYY-MM-DD HH24:MI:SS'), null, '1', '系统管理', '#', '40', 'denghaier', null, null, '111', '系统管理', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('119', TO_DATE('2012-10-09 01:05:33','YYYY-MM-DD HH24:MI:SS'), null, '1', '效能分析', '#', '40', 'denghaier', null, null, '116', '效能分析', null, null, '4', null, null);
INSERT INTO "AC_MENU" VALUES ('99', null, TO_DATE('2012-10-09 00:23:21','YYYY-MM-DD HH24:MI:SS'), '1', '运价查询', '#', null, null, '40', 'denghaier', '1', '运价查询', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('95', null, TO_DATE('2012-10-09 00:20:31','YYYY-MM-DD HH24:MI:SS'), '1', '分组管理', 'admin/groupAction!toGroupListJsp.action', null, null, '40', 'denghaier', '63', '分组管理', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('103', TO_DATE('2012-10-09 00:31:53','YYYY-MM-DD HH24:MI:SS'), null, '1', '运价分析', '#', '40', 'denghaier', null, null, null, '运价分析', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('104', TO_DATE('2012-10-09 00:32:17','YYYY-MM-DD HH24:MI:SS'), null, '1', '运价分析', '#', '40', 'denghaier', null, null, '103', '运价分析', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('105', null, TO_DATE('2012-10-11 09:29:04','YYYY-MM-DD HH24:MI:SS'), '1', '价格走势', 'priceAnalyseAction!priceForm.action', null, null, '41', 'system', '104', '价格走势', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('110', TO_DATE('2012-10-09 00:53:43','YYYY-MM-DD HH24:MI:SS'), TO_DATE('2012-10-18 14:41:57','YYYY-MM-DD HH24:MI:SS'), '1', '航空公司列表', 'airCompanySettingAction!showAirCompanyList.action?pageNum=1&pageSize=15', '1', 'liangxh', '41', 'system', '44', '航空公司列表', null, null, '4', null, null);
INSERT INTO "AC_MENU" VALUES ('111', TO_DATE('2012-10-09 00:54:59','YYYY-MM-DD HH24:MI:SS'), null, '1', '个人中心', '#', '1', 'liangxh', null, null, null, null, null, null, '4', null, null);
INSERT INTO "AC_MENU" VALUES ('100', null, TO_DATE('2012-10-11 14:38:43','YYYY-MM-DD HH24:MI:SS'), '1', '运价查询', 'queryPriceAction!toQuryPriceJSP.action', null, null, '41', 'system', '99', '运价查询', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('112', TO_DATE('2012-10-09 00:56:40','YYYY-MM-DD HH24:MI:SS'), null, '1', '抓取管理', '#', '1', 'liangxh', null, null, null, '抓取管理', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('120', TO_DATE('2012-10-09 01:06:04','YYYY-MM-DD HH24:MI:SS'), null, '1', '角色管理', 'admin/roleAction!toRoleListJsp.action', '40', 'denghaier', null, null, '116', '角色管理', null, null, '3', null, null);
INSERT INTO "AC_MENU" VALUES ('123', TO_DATE('2012-10-25 09:38:55','YYYY-MM-DD HH24:MI:SS'), null, '1', '角色管理', 'admin/roleAction!toRoleListJsp.action', '41', 'system', null, null, '63', '角色管理', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('177', null, TO_DATE('2012-11-20 00:00:00','YYYY-MM-DD HH24:MI:SS'), '1', '代理渠道统计', 'proxyAction!toQuDaoJsp.action', '41', 'system', '41', 'system', '116', '代理渠道统计', null, null, '7', null, null);
INSERT INTO "AC_MENU" VALUES ('178', null, TO_DATE('2012-11-20 00:00:00','YYYY-MM-DD HH24:MI:SS'), '1', '代理使用者统计', 'proxyAction!toUserJsp.action', '41', 'system', '41', 'system', '116', '代理使用者统计', null, null, '8', null, null);
INSERT INTO "AC_MENU" VALUES ('125', null, null, '1', '用户管理', 'admin/userAction!toUserListJsp.action', '44', null, null, null, '116', '用户管理', null, null, '2', null, null);
INSERT INTO "AC_MENU" VALUES ('124', TO_DATE('2012-11-13 10:04:59','YYYY-MM-DD HH24:MI:SS'), null, '1', '修改密码', 'userAction!toUserChangepwd.action', '44', 'super', null, null, '116', '修改密码', null, null, '1', null, null);
INSERT INTO "AC_MENU" VALUES ('77', null, TO_DATE('2012-11-14 00:00:00','YYYY-MM-DD HH24:MI:SS'), '1', '代理监控', 'proxyAction!toProxyActionJsp.action', '41', 'system', '41', 'system', '116', '代理监控', null, null, '6', null, null);
INSERT INTO "AC_MENU" VALUES ('180', null, null, '1', '起飞时间差距设置', 'taskInfoAction!toTakeoffTimeLink.action', null, null, null, null, '113', '起飞时间差距设置', null, null, '3', null, null);
COMMIT;

-- ----------------------------
--  Table structure for "AC_ROLEMENU"
-- ----------------------------
DROP TABLE "AC_ROLEMENU";
CREATE TABLE "AC_ROLEMENU" (   "ROLEIDS" NUMBER(19,0) NOT NULL, "MENUIDS" NUMBER(19,0) NOT NULL);

-- ----------------------------
--  Records of "AC_ROLEMENU"
-- ----------------------------
INSERT INTO "AC_ROLEMENU" VALUES ('1', '20');
INSERT INTO "AC_ROLEMENU" VALUES ('1', '71');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '3');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '4');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '5');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '6');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '7');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '8');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '9');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '10');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '11');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '12');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '13');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '14');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '16');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '17');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '18');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '19');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '20');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '21');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '24');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '25');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '26');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '27');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '28');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '30');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '31');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '32');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '33');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '34');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '36');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '38');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '39');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '42');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '44');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '46');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '47');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '49');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '50');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '51');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '52');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '53');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '59');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '60');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '61');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '63');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '64');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '65');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '66');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '67');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '70');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '71');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '72');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '78');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '83');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '84');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '87');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '90');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '91');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '92');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '93');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '94');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '95');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '96');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '97');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '98');
INSERT INTO "AC_ROLEMENU" VALUES ('2', '99');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '1');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '3');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '4');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '5');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '6');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '7');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '8');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '9');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '10');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '11');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '12');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '13');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '14');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '16');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '17');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '18');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '19');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '20');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '21');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '24');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '25');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '26');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '27');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '28');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '30');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '31');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '32');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '33');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '34');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '36');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '38');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '39');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '42');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '44');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '46');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '47');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '49');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '50');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '51');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '52');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '53');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '59');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '60');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '61');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '63');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '64');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '65');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '66');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '67');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '70');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '71');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '72');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '78');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '83');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '84');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '87');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '90');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '91');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '92');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '93');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '94');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '95');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '96');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '97');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '98');
INSERT INTO "AC_ROLEMENU" VALUES ('3', '99');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '1');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '3');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '4');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '5');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '6');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '7');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '8');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '9');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '10');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '11');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '12');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '13');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '14');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '16');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '17');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '18');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '19');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '20');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '21');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '24');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '25');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '26');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '27');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '28');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '30');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '31');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '32');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '33');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '34');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '36');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '38');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '39');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '42');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '44');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '46');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '47');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '49');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '50');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '51');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '52');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '53');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '59');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '60');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '61');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '63');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '64');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '65');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '66');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '67');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '70');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '71');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '72');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '78');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '83');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '84');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '87');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '90');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '91');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '92');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '93');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '94');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '95');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '96');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '97');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '98');
INSERT INTO "AC_ROLEMENU" VALUES ('4', '99');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '24');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '25');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '26');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '27');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '28');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '34');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '50');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '51');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '52');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '67');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '72');
INSERT INTO "AC_ROLEMENU" VALUES ('5', '84');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '1');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '3');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '6');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '9');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '13');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '18');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '19');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '20');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '21');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '24');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '25');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '26');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '27');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '30');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '31');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '32');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '33');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '34');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '36');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '38');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '39');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '42');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '44');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '46');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '47');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '49');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '50');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '51');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '52');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '59');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '60');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '63');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '64');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '65');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '66');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '67');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '70');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '71');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '72');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '78');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '83');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '95');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '99');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '100');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '103');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '104');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '105');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '106');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '107');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '108');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '109');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '110');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '111');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '112');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '113');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '114');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '115');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '116');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '117');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '118');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '119');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '120');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '124');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '125');
INSERT INTO "AC_ROLEMENU" VALUES ('6', '180');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '1');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '77');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '99');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '100');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '103');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '104');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '105');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '107');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '108');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '111');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '112');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '113');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '114');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '115');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '116');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '117');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '118');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '119');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '120');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '121');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '124');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '125');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '177');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '178');
INSERT INTO "AC_ROLEMENU" VALUES ('7', '180');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '1');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '33');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '42');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '44');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '47');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '59');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '60');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '63');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '66');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '95');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '99');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '100');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '103');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '104');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '105');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '107');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '108');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '109');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '110');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '111');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '112');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '113');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '114');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '115');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '116');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '117');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '118');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '119');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '120');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '121');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '122');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '123');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '124');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '125');
INSERT INTO "AC_ROLEMENU" VALUES ('8', '180');
COMMIT;

-- ----------------------------
--  Primary key structure for table "AC_MENU"
-- ----------------------------
ALTER TABLE "AC_MENU" ADD CONSTRAINT "BIN$v+7UyZ5kRS6ZU4KQnoX4Hw==$0" PRIMARY KEY("IDS");

-- ----------------------------
--  Primary key structure for table "AC_ROLEMENU"
-- ----------------------------
ALTER TABLE "AC_ROLEMENU" ADD CONSTRAINT "BIN$ku2iBdGHThGZtiC4m2nbNw==$0" PRIMARY KEY("ROLEIDS","MENUIDS");

