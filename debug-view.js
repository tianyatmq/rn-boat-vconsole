import React from "react";
import {View, StyleSheet, Text, Button} from "react-native";
import DebugListView from "./debug-list-view.js";
import debugService from "./debug-service";
import debounce from "debounce";

const HEADER_COLOR = "#efeff4";
const BORDER_COLOR = "#d9d9d9";
const TAPITEM_ACTIVE_COLOR = "#ffffff";
const TAPITEM_NORMAL_COLOR = HEADER_COLOR;
const TABITEM_TEXT_COLOR = "#000000"

export default class DebugView extends React.Component {
    tabItems = ['Log', 'System', 'Storage'];

    constructor() {
        super();
        this.state = {
            rows: [],
            activeTabItem: 'Log',
            visible: false
        };
        this.unmounted = false;
        this.updateDebounced = debounce(this.update.bind(this), 150);
    }

    componentWillUnmount() {
        this.unmounted = true;
        if (this.listner) {
            this.listner();
        }
    }

    update(data) {
        if (data) {
            if (!this.unmounted) {
                this.setState({rows: data});
            }
        }
    }

    componentWillMount() {
        this.listner = debugService.onDebugRowsChanged(this.updateDebounced);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }

    _renderTabItem() {
        return this.tabItems.map(val => {
            let isActive = this.state.activeTabItem == val;
            return (
                <Text key={val}
                      style={[styles.tabItem, {backgroundColor: (isActive ? TAPITEM_ACTIVE_COLOR : TAPITEM_NORMAL_COLOR)}]}
                      onTouchStart={() => {
                          this.setState({
                              activeTabItem: val
                          })
                      }}>
                    {val}
                </Text>
            );
        })
    }

    render() {
        return (
                <View style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    width: this.props.style.width,
                    top: this.state.visible ? 0 : this.props.style.height + 100,
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'visible'
                }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            {this._renderTabItem()}
                        </View>
                        <DebugListView rows={this.state.rows} {...this.props} />
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.7,
    },
    header: {
        backgroundColor: HEADER_COLOR,
        flexDirection: "row",
        minHeight: 40,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
    },
    footer: {},
    tabItem: {
        width: 80,
        borderColor: BORDER_COLOR,
        borderRightWidth: 1,
        backgroundColor: TAPITEM_NORMAL_COLOR,
        textAlign: "center",
        textAlignVertical: "center",
        color: TABITEM_TEXT_COLOR
    },
});
